const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { avatar, name, username, email, password } = req.body
    if (!avatar || !name || !username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are mandatory!' })
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists!'
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      avatar,
      username,
      name,
      email,
      password: hashedPassword
    })
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SEC)
    res.status(201).json({
      success: true,
      message: 'User has been created',
      token: token
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are mandatory!' })
    }
    const userExist = await User.findOne({ username })
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this username!'
      })
    }
    if (await bcrypt.compare(password, userExist.password)) {
      const token = jwt.sign({ id: userExist._id }, process.env.JWT_SEC)
      return res.status(200).json({
        success: false,
        user: userExist,
        token: token
      })
    }
    res.status(400).json({
      success: false,
      message: 'Invalid username or password!'
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const signout = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { register, login, signout }
