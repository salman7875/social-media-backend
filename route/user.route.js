const express = require('express')
const checkAuthToken = require('../middleware/auth')
const {
  followUnfollow,
  getAllUsers,
  getUser,
  getCurrentUser
} = require('../controller/user.controller')
const router = express.Router()

router.post('/actions/:id', checkAuthToken, followUnfollow)
router.get('/current', checkAuthToken, getCurrentUser)
router.get('/users', getAllUsers)
router.get('/:id', getUser)
router.get('/current', checkAuthToken, getCurrentUser)

module.exports = router
