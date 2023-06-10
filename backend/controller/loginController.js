// controlling login Methods

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// SignUp model ma vako scheme use garera login credentials CrossCheck
const UserModels = require('../models/signUpModel')

const postUserLogin = async (req, res) => {
  // converting @gmail.com domain into lowercase to match with database
  const email = ConvertEmail(req.body.email)

  const result = await UserModels.findOne({ email }).select('+password')

  if (!result) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: `Invalid email or password` })
  }
  const validate_password = await bcrypt.compare(
    req.body.password,
    result.password
  )
  if (!validate_password) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid email or password' })
  }

  // Generating json web token on success login
  const jwt_token = await jwt.sign(
    {
      id: result._id,
      username: result.username,
      email,
      userType: result.userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFE,
    }
  )

  res.cookie(String(result._id), jwt_token, {
    path: '/',
    //1000ms * sec * min * hr ->
    expires: new Date(Date.now() + 1000 * 60),
    httpOnly: true,
    sameSite: 'lax',
  })

  return res.status(StatusCodes.OK).json({
    success: true,
    userType: result.userType,
  })
}

// Converting @gmail.com to lower
const ConvertEmail = (email) => {
  const emailParts = email.split('@')
  const firstEmailPart = emailParts[0]
  const secondEmailPart = emailParts[1].toLowerCase()

  return (FinalEmail = firstEmailPart + '@' + secondEmailPart)
}

module.exports = postUserLogin
