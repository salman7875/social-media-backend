const User = require('../model/user.model')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users) {
      return res.status(404).json({
        success: false,
        message: 'No user found!'
      })
    }
    res.status(200).json({
      success: true,
      users: users
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found!'
      })
    }
    res.status(200).json({
      success: true,
      user: user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found!'
      })
    }
    res.status(200).json({
      success: true,
      user: user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const followUnfollow = async (req, res) => {
  try {
    const userId = req.user
    const id = req.params.id
    const currentUser = await User.findById(userId)
    const anotherUser = await User.findById(id)

    if (!anotherUser) {
      return res.status(404).json({
        success: false,
        message: 'No user found!'
      })
    }

    if (currentUser.followings.includes(id)) {
      const index = currentUser.followings.findIndex(user => user._id === id)
      currentUser.followings.splice(index, 1)
      const i = anotherUser.followers.findIndex(user => user._id === userId)
      anotherUser.followers.splice(index, 1)
      await currentUser.save()
      await anotherUser.save()

      return res.status(200).json({
        success: true,
        message: 'Unfollowed'
      })
    } else {
      currentUser.followings.push(id)
      anotherUser.followers.push(userId)
      await currentUser.save()
      await anotherUser.save()

      return res.status(200).json({
        success: true,
        message: 'Followed'
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { followUnfollow, getAllUsers, getUser, getCurrentUser }
