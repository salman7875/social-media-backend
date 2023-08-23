require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRoute = require('./route/auth.route')
const userRoute = require('./route/user.route')
const postRoute = require('./route/post.route')
const commentRoute = require('./route/comment.route')

const app = express()

// DATABASE
mongoose
  .connect(process.env.DB)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err.message))

// MIDDLEWARE
app.use(express.json())

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/comment', commentRoute)

const PORT = process.env.PORT || 6000
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
