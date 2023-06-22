const express = require('express')
const forgotpasswordRouter = express.Router()

const {
  postForgotPassword,
  patchUpdatePassword,
} = require('../controller/forgotpasswordController')

forgotpasswordRouter
  .route('/')
  .post(postForgotPassword)
  .patch(patchUpdatePassword)

module.exports = forgotpasswordRouter
