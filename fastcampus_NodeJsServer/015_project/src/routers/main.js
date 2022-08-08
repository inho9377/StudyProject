// @ts-check

const { SESV2 } = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')
const express = require('express')

const { APP_CONFIG_JSON, HOST } = require('../common')
const { getUsersCollection, getPostsCollection } = require('../mongo')
const {
  setAccessTokenCookie,
  encryptPassword,
  comparePassword,
  getAccessTokenForUserId,
} = require('../auth/auth')
const { signJWT } = require('../auth/jwt')
const { restart } = require('nodemon')
const { redirectWithMsg } = require('../util')

const router = express.Router()
const ses = new SESV2()

router.get('/', async (req, res) => {
  /*
  Todo
  - 다른 사람의 글에는 삭제 버튼을 보여주지 말 것 (1)
  - 내 닉네임 혹은 이메일이 보일 것 (2) - 정보가 내려가므로 클라이언트에서 보여주기만 하면 됨
  - 가장 최근에 만들어진 글이 맨 뒤에 보일 것 (3)
  */
  if (req.user) {
    const postsCol = await getPostsCollection()
    const postsCursor = await postsCol.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'id',
          as: 'users',
        },
      },
      {
        $sort: {
          createdAt: -1, // Todo 3번.
        },
      },
    ])

    const posts = (await postsCursor.toArray()).map(({ users, ...rest }) => ({
      ...rest,
      user: users[0],
    }))

    res.render('home', {
      user: req.user, // Todo 2번.
      posts,
      APP_CONFIG_JSON,
    })
  } else {
    res.render('signin', {
      APP_CONFIG_JSON,
    })
  }
})

router.get('/request-reset-password', (req, res) => {
  res.render('request-reset-password', {
    APP_CONFIG_JSON,
  })
})

router.get('/reset-password', async (req, res) => {
  const { code } = req.query

  const users = await getUsersCollection()
  const user = await users.findOne({
    passwordResetCode: code,
  })

  if (!user || !user.pendingPassword) {
    res.status(400).end()
    return
  }

  const { pendingPassword } = user

  await user.updateOne(
    {
      id: user.id,
    },
    {
      $set: {
        password: pendingPassword,
        pendingPassword: null,
      },
    }
  )

  redirectWithMsg({
    res,
    dest: '/',
    error: '비밀번호가 변경되었습니다. 해당 비밀번호로 로그인 해 주세요',
  })
})

router.post('/request-reset-password', async (req, res) => {
  if (!req.body) {
    res.status(400).end()
    return
  }

  const { email, password } = req.body
  const users = await getUsersCollection()

  if (!email || !password) {
    redirectWithMsg({
      res,
      dest: '/request-reset-password',
      error: '이메일과 패스워드를 모두 입력해주세요',
    })
  }

  const existingUser = await users.findOne({
    email,
  })

  if (!existingUser) {
    redirectWithMsg({
      res,
      dest: '/request-reset-password',
      error: '존재하지 않는 이메일입니다.',
    })
    return
  }

  const passwordResetCode = uuidv4()
  await ses
    .sendEmail({
      Content: {
        Simple: {
          Subject: {
            Data: '비밀번호 초기화',
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: `다음 링크를 눌러 비밀번호를 초기화합니다 https://${HOST}/reset-password?code=${passwordResetCode}`,
              Charset: 'UTF-8',
            },
          },
        },
      },
      Destination: {
        ToAddresses: [email],
      },
      FromEmailAddress: 'noreply@yuadrwer.com', // AWS 에 등록한 이메일
    })
    .promise() // await 가능

  await users.updateOne(
    {
      id: existingUser.id,
    },
    {
      $set: {
        pendingPassword: await encryptPassword(password),
        passwordResetCode,
      },
    }
  )

  redirectWithMsg({
    res,
    dest: '/',
    error: '비밀번호 초기화 요청이 전송되었습니다. 이메일을 확인해 주세요!',
  })
})

router.get('/signup', (req, res) => {
  res.render('signup', {
    APP_CONFIG_JSON,
  })
})

router.post('/signin', async (req, res) => {
  if (!req.body) {
    redirectWithMsg({
      res,
      dest: '/',
      error: '잘못된 요청입니다.',
    })
    return
  }

  const users = await getUsersCollection()
  const { email, password } = req.body

  if (!email || !password) {
    redirectWithMsg({
      res,
      dest: '/',
      error: '이메일과 비밀번호를 모두 입력해주세요.',
    })
    return
  }

  const existingUser = await users.findOne({
    email,
  })

  if (!existingUser) {
    redirectWithMsg({
      res,
      dest: '/',
      error: '이메일 혹은 비밀번호가 일치하지 않습니다.', // 반환 정보 제한
    })
    return
  }

  const isPasswordCorrect = await comparePassword(
    password,
    existingUser.password
  )
  if (isPasswordCorrect) {
    const token = await getAccessTokenForUserId(existingUser.id)
    setAccessTokenCookie(res, token)

    redirectWithMsg({
      res,
      dest: '/',
      info: '로그인 되었습니다.',
    })
  } else {
    redirectWithMsg({
      res,
      dest: '/',
      error: '이메일 혹은 비밀번호가 일치하지 않습니다.',
    })
  }
})

router.get('/verify-email', async (req, res) => {
  const { code } = req.query
  if (!code) {
    res.status(400).end()
    return
  }

  const users = await getUsersCollection()
  const user = await users.findOne({ emailVerificationCode: code })
  if (!user) {
    res.status(400).end()
    return
  }

  await users.updateOne(
    {
      id: user.id,
    },
    {
      $set: {
        verfied: true,
      },
    }
  )

  redirectWithMsg({
    res,
    dest: '/',
    info: '이메일이 인증되었습니다.',
  })
})

router.post('/signup', async (req, res) => {
  const users = await getUsersCollection()
  const { email, password } = req.body

  // TODO
  if (!email || !password) {
    redirectWithMsg({
      dest: '/signup',
      error: '이메일과 비밀번호를 모두 입력해야 합니다.',
      res,
    })
    // 리다이렉트 진행되도 그쪽 불리지 않길 원하므로 리턴 필요
    return
  }

  const existingUser = await users.findOne({
    email,
  })

  if (existingUser) {
    redirectWithMsg({
      dest: '/signup',
      error: '같은 이메일의 유저가 이미 존재합니다',
      res,
    })

    return
  }

  const newUserId = uuidv4()
  const emailVerificationCode = uuidv4()
  await ses
    .sendEmail({
      Content: {
        Simple: {
          Subject: {
            Data: '이메일 인증 요청',
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: `다음 링크를 눌러 이메일 인증을 진행해주세요 https://${HOST}/verify-email?code=${emailVerificationCode}`,
              Charset: 'UTF-8',
            },
          },
        },
      },
      Destination: {
        ToAddresses: [email],
      },
      FromEmailAddress: 'noreply@yuadrwer.com', // AWS 에 등록한 이메일
    })
    .promise() // await 가능

  await users.insertOne({
    id: newUserId,
    email,
    password: encryptPassword(password),
    verified: false,
    emailVerificationCode,
  })

  setAccessTokenCookie(res, await signJWT(newUserId))
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  res.clearCookie('access_token')
  res.redirect('/')
})

module.exports = router
