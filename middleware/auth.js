const jwt = require('jsonwebtoken')

const checkAuthToken = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization
  if (authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token found!'
      })
    }
    jwt.verify(token, process.env.JWT_SEC, (err, data) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: 'Unauthorized!' })
      } else {
        req.user = data.id
      }
    })
  }
  next()
}

module.exports = checkAuthToken
