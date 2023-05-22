// Controller for user Signup page

const TryCatchWrapper = require('../errorHandler/TryCatchBoiler')
const signUpModel = require('../models/signUpModel')
const bcrypt = require('bcrypt')

const postUserSignup = TryCatchWrapper(async (req, res) => {
  const { username, email, phone } = req.body

  const password = await bcrypt.hash(req.body.password, 10)

  await signUpModel.create({ username, email, phone, password })

  res.status(200).json({ success: true, message: `user created successfully` })
})

module.exports = postUserSignup
