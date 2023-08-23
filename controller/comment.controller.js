const Comment = require('../model/comment.model')
const Post = require('../model/post.model')

const createComment = async (req, res) => {
  try {
    const { comment } = req.body
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'No Post Found!'
      })
    }
    const newComment = await Comment.create({ comment, userId: req.user })
    post.comments.push(newComment._id)
    await post.save()
    res.status(201).json({
      success: true,
      post: post
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { createComment }
