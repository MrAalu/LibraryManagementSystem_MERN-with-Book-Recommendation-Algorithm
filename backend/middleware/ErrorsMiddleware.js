// All IF conditions handler

// cookie isnt available or doesnt exists
const cookieNotAvailable = (req, res) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: `Access-Cookie doesn't exists ! Login Please`,
  })
}

// token isnt available or doesnt exists
const tokenNotAvailable = (req, res) => {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: false, message: `Token doesn't exists` })
}

// token verification failed, token was corrupted or INVALID
const invalidTokenVerification = (req, res) => {
  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ success: false, message: `Invalid Token` })
}

const invalidRefreshTokenVerification = (req, res) => {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: false, message: `Invalid Refresh Token` })
}

const refreshTokenNotAvailable = (req, res) => {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: false, message: `Refresh Token Not Available` })
}

// token verfication PROCESS Failed (Catch Error)
const tokenVerificationError = (req, res) => {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: false, message: `Token Verification Error` })
}

// Error is not authorized
const unauthorizedUser = (req, res) => {
  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ success: false, message: `ACCESS DENIED! Unauthorized User !` })
}

module.exports = {
  cookieNotAvailable,
  tokenNotAvailable,
  invalidTokenVerification,
  tokenVerificationError,
  unauthorizedUser,
  refreshTokenNotAvailable,
  invalidRefreshTokenVerification,
}
