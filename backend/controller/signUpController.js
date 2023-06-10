// Controller for user Signup page

const signUpModel = require('../models/signUpModel')
const bcrypt = require('bcrypt')

const postUserSignup = async (req, res) => {
  const { username, email, phone, userType } = req.body

  const check_Already_exists = await signUpModel.findOne({ email })
  if (check_Already_exists) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, message: `Email already Exists` })
  }

  const password = await bcrypt.hash(req.body.password, 10)

  await signUpModel.create({ username, email, phone, password, userType })

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: `User created successfully` })
}

module.exports = postUserSignup
