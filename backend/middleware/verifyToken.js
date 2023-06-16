const jwt = require('jsonwebtoken')

const {
  cookieNotAvailable,
  tokenNotAvailable,
  invalidTokenVerification,
  tokenVerificationError,
} = require('../middleware/ErrorsMiddleware')

const verifyToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie

    if (!cookies) {
      return cookieNotAvailable(req, res)
    }

    const token = cookies.split('=')[1]

    if (!token) {
      return tokenNotAvailable(req, res)
    }

    await jwt.verify(String(token), process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return invalidTokenVerification(req, res)
      }

      req.userId = payload.id
      req.userEmail = payload.email
      next()
    })
  } catch (error) {
    tokenVerificationError(req, res)
  }
}

module.exports = verifyToken
