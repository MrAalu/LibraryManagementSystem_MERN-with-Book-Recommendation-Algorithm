// All IF conditions handler

const cookieNotAvailable = (req, res) => {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: false, message: `Cookie doesn't exists` })
}

const tokenNotAvailable = (req, res) => {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: false, message: `Token doesn't exists` })
}

const invalidTokenVerification = (req, res) => {
  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ success: false, message: `Invalid Token` })
}

const tokenVerificationError = (req, res) => {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: false, message: `Token Verification Error` })
}

module.exports = {
  cookieNotAvailable,
  tokenNotAvailable,
  invalidTokenVerification,
  tokenVerificationError,
}
