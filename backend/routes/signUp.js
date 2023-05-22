// User Register/Signup Form API

const postUserSignup = require('../controller/signUpController')

const express = require('express')
const signUpRouter = express.Router()

// Parse Form data in JSON Format
signUpRouter.use(express.json())
signUpRouter.route('/').post(postUserSignup)

module.exports = signUpRouter
