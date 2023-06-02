const CustomError = (err, req, res, next) => {
  if (err.keyPattern) {
    return res
      .status(400)
      .json({ status: 'fail', message: `Email already exists` })
  }

  res.status(400).json({ status: 'fail', message: err })
}

module.exports = CustomError
