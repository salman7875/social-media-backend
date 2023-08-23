const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
