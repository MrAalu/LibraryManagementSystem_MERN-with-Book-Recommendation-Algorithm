// controlling login Methods

const TryCatchWrapper = require('../errorHandler/TryCatchBoiler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// SignUp model ma vako scheme use garera login credentials CrossCheck
const UserModels = require('../models/signUpModel')

const postUserLogin = TryCatchWrapper(async (req, res) => {
  // converting @gmail.com domain into lowercase to match with database
  const email = ConvertEmail(req.body.email)

  const result = await UserModels.findOne({ email }).select('+password')
  // console.log(result)

  if (!result) {
    return res.status(401).json({ message: `User doesn't exists!` })
  }
  const validate_password = await bcrypt.compare(
    req.body.password,
    result.password
  )
  if (!validate_password) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  // Generating json web token on success login
  const jwt_token = await jwt.sign({ email }, process.env.TOKEN_STRING, {
    expiresIn: '1d',
  })

  res.status(200).json({ success: true, token: jwt_token })
})

// Converting @gmail.com to lower
const ConvertEmail = (email) => {
  const emailParts = email.split('@')
  const firstEmailPart = emailParts[0]
  const secondEmailPart = emailParts[1].toLowerCase()

  return (FinalEmail = firstEmailPart + '@' + secondEmailPart)
}

module.exports = postUserLogin
