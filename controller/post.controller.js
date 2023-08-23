const Post = require('../model/post.model')
const User = require('../model/user.model')

const getPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('posts')
    res.status(200).json({
      success: true,
      post: user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const createPost = async (req, res) => {
  try {
    const { content, caption } = req.body
    const id = req.user
    console.log(id)
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'No Content Provided!'
      })
    }
    const user = await User.findById(id)
    const newPost = await Post.create({ content, caption, userId: id })
    user.posts?.push(newPost._id)
    await user.save()
    res.status(200).json({ success: true, post: newPost })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const likeDislike = async (req, res) => {
  try {
    const postId = req.params.id
    const userId = req.user
    const post = await Post.findById(postId)
    if (post.likes.includes(userId)) {
      const index = post.likes.findIndex(p => p._id === userId)
      post.likes.splice(index, 1)

      await post.save()
      return res.status(200).json({
        success: true,
        message: 'Unliked!'
      })
    } else {
      post.likes.push(userId)
      await post.save()
      return res.status(200).json({
        success: true,
        message: 'Liked!'
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { createPost, likeDislike, getPosts }
