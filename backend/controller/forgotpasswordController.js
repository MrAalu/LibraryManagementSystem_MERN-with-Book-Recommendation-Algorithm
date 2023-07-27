// Handles forgot password using EMAIL and PHONE
const bcrpyt = require('bcrypt')
const UserModel = require('../models/signUpModel')

// First we check email and phone then call next APi(patchUpdatePassword) that updates password
const postForgotPassword = async (req, res) => {
  const { email, phone } = req.body

  const checkEmailPhone = await UserModel.find({ email, phone })

  if (checkEmailPhone.length <= 0) {
    return res
      .status(400)
      .json({ success: false, message: `Invalid Email or Phone` })
  }

  // only sending UserId to later use for Patching PASSWORD
  const userId = checkEmailPhone[0]._id.toString()

  res.status(200).json({ success: true, userId })
}

const patchUpdatePassword = async (req, res) => {
  const { userId, newPassword } = req.body

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: `No User id to recover password` })
  }

  const checkUser = await UserModel.findById(userId)
  if (!checkUser) {
    return res
      .status(400)
      .json({ success: false, message: `User doesn't exists` })
  }

  // Validate alphanumeric password with a must Special character
  const alphanumericRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

  const isPasswordValid = alphanumericRegex.test(newPassword)
  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: `'Password must be alphanumeric and contain at least one special character'`,
    })
  }

  const updatedPassword = await bcrpyt.hash(newPassword, 10)

  const result = await UserModel.findByIdAndUpdate(userId, {
    password: updatedPassword,
  })

  res
    .status(200)
    .json({ success: true, message: `Password Changed Successfully` })
}

module.exports = { patchUpdatePassword, postForgotPassword }
