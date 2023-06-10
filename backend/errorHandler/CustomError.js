const CustomError = (err, req, res, next) => {
  if (err.keyPattern) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: 'fail', message: `Email already exists` })
  }

  res.status(StatusCodes.BAD_REQUEST).json({ status: 'fail', message: err })
}

module.exports = CustomError
