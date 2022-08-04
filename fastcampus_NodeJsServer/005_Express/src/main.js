// @ts-check

const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

const fs = require('fs')
const { resolve } = require('path')
//익스프레스 앱
const app = express()

// app.use(bodyParser.json()) //끼워넣기
app.use(express.json()) //최신버전
app.use('/public', express.static('src/public'))
app.use((err, req, res, next) => {
  res.send(err.message)
}) //4개 인자 받을 때 에러핸들링

app.set('views', '/src/views') //뷰 엔진이필요로 하는 뷰의 폴더 세팅
app.set('view engine', 'pug')

const PORT = 5001

///ab? abcd or acd

const USERS = {
  15: {
    nickname: 'foo',
    profileImage: undefined
  },
  16: {
    nickname: 'bar',
    profileImage: undefined
  },
}

router.get('/', (req, res) => {
  res.send('Root - GET')
})

//users/:id와 같음
router.get('/:id', (req, res) => {
  // req.header.accept // 받기 원하는 타입. JSON, HTML ...
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    console.log('router getId')
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      //@ts-ignore
      nickname: req.user.nickname,
    })
  }
})

router.post('/:id/nickname', (req, res) => {
  // req.body: {"nickname": "bar"}
  //@ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname
  res.send(`USER NICKNAME ${nickname}`)
})

//:id 에서 먼저 받음
router.param('id', async (req, res, next, value) => {
  try {
    console.log(value)
    //@ts-ignore
    req.user = USERS[value]
    next()
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res) => {
  //register user
  res.send('Root - POST')
})

app.use('/users', router) ///

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hello Pug!',
  })
})

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`)
})

module.exports = app