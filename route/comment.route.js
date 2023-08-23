const express = require('express')
const checkAuthToken = require('../middleware/auth')
const { createComment } = require('../controller/comment.controller')
const router = express.Router()

router.post('/create/:id', checkAuthToken, createComment)

module.exports = router
