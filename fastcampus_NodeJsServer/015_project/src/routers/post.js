const { v1: uuidv1 } = require('uuid')
// v1 : unique. v4: random
const express = require('express')
const { getPostsCollection } = require('../mongo')
const { route } = require('./main')
const { redirectWithMessage } = require('../util')

const router = express.Router()

router.get('/', async (req, res) => {
  if (!req.user) {
    res.status(403).end()
    return
  }

  const posts = await getPostsCollection()

  const { content } = req.body
  posts.insertOne({
    id: uuidv1(),
    userid: req.user.id,
    content,
    createdAt: new Date(),
  })

  redirectWithMessage({
    dest: '/',
    res,
    info: '포스트가 작성되었습니다.',
  })
})

router.post('/:postId/delete', async (req, res) => {
  const { postId } = req.params

  const posts = await getPostsCollection()

  // 인증
  const existPost = posts.findOne({
    id: postId,
  })

  if (existPost.userId !== req.user.id) {
    res.status(403).end()
    return
  }

  posts.deleteOne({
    id: postId,
  })

  redirectWithMessage({
    dest: '/',
    res,
    info: '포스트가 삭제되었습니다',
  })
})

router.post('/:postId/update', async (req, res) => {
  const { postId } = req.params
  const { content } = req.body

  const posts = await getPostsCollection()

  // 인증
  const existPost = posts.findOne({
    id: postId,
  })

  if (existPost.userId !== req.user.id) {
    res.status(403).end()
    return
  }

  posts.updateOne(
    {
      id: postId,
    },
    {
      $set: {
        content,
      },
    }
  )

  redirectWithMessage({
    dest: '/',
    res,
    info: '포스트가 삭제되었습니다',
  })
})

module.exports = router
