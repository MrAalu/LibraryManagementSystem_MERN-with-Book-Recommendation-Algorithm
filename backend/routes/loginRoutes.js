// handling user logins and generating JWT if success

const express = require('express')
const loginRouter = express.Router()
const postUserLogin = require('../controller/loginController')

loginRouter.route('/').post(postUserLogin)

module.exports = loginRouter
