// authenticates CLIENT user type
const jwt = require('jsonwebtoken')

const {
  cookieNotAvailable,
  tokenNotAvailable,
  invalidTokenVerification,
  tokenVerificationError,
  unauthorizedUser,
} = require('./ErrorsMiddleware')

const clientAuthorization = async (req, res, next) => {
  try {
    // Get the JWT token from the cookie
    const cookies = req.headers.cookie
    if (!cookies) {
      return cookieNotAvailable(req, res)
    }

    const token = cookies.split('=')[1]
    if (!token) {
      return tokenNotAvailable(req, res)
    }

    // Verify the token and decode the payload
    await jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return invalidTokenVerification(req, res)
      }

      // Check if the user type is normal / client
      if (payload.userType === 'normal_user') {
        next()
      } else {
        // User is not an admin, send an error response
        unauthorizedUser(req, res)
      }
    })
  } catch (err) {
    // Token verification failed, send an error response
    tokenVerificationError(req, res)
  }
}

module.exports = { clientAuthorization }
