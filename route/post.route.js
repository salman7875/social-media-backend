const express = require('express')
const checkAuthToken = require('../middleware/auth')
const {
  createPost,
  likeDislike,
  getPosts
} = require('../controller/post.controller')
const router = express.Router()

router.post('/create', checkAuthToken, createPost)
router.post('/actions/:id', checkAuthToken, likeDislike)
router.get('/feed', checkAuthToken, getPosts)

module.exports = router
