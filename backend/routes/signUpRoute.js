// User Register/Signup Form API

const {
  postUserSignup,
  verifyEmail,
  resendOtpCode,
} = require('../controller/signUpController')

const express = require('express')
const signUpRouter = express.Router()

signUpRouter.route('/').post(postUserSignup)
signUpRouter.route('/verifyEmail').post(verifyEmail)
signUpRouter.route('/resendOtp').post(resendOtpCode)

module.exports = signUpRouter
