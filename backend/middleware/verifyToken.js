// This JS verifies the user token .
// If token has expired than validates the token and it creates new refresh Token
const jwt = require('jsonwebtoken')

const {
  cookieNotAvailable,
  tokenNotAvailable, //earlier used to split token from cookies,not used anymore
  invalidTokenVerification,
  tokenVerificationError,
  refreshTokenNotAvailable,
  invalidRefreshTokenVerification,
} = require('../middleware/ErrorsMiddleware')

const verifyToken = async (req, res, next) => {
  const token = req.cookies['access-cookie']
  const refreshToken = req.cookies['refresh-cookie']

  if (!token) {
    return cookieNotAvailable(req, res)
  }

  try {
    await jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          if (refreshToken) {
            try {
              const decodedRefreshToken = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
              )

              const { id, username, email, userType } = decodedRefreshToken

              // Verify that the decoded refresh token is valid and matches the user
              if (decodedRefreshToken) {
                // Generate a new access token
                const newAccessToken = jwt.sign(
                  {
                    id: id,
                    username: username,
                    email: email,
                    userType: userType,
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: process.env.JWT_LIFE } // Short-lived access token
                )

                res.cookie('access-cookie', newAccessToken, {
                  path: '/',
                  expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                  httpOnly: true,
                  sameSite: 'lax',
                })
                req.userId = id
                req.userEmail = email
                req.username = username
                return next()
              } else {
                // The refresh token is invalid or doesn't match the user
                return invalidRefreshTokenVerification(req, res)
              }
            } catch (error) {
              return invalidRefreshTokenVerification(req, res)
            }
          } else {
            return refreshTokenNotAvailable(req, res)
          }
        } else {
          return invalidTokenVerification(req, res)
        }
      }

      // Token is valid, set the user information in the request and proceed
      req.userId = payload.id
      req.userEmail = payload.email
      req.username = payload.username

      return next()
    })
  } catch (error) {
    return tokenVerificationError(req, res)
  }
}

module.exports = verifyToken
