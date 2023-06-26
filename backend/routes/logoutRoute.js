// handling user Logout

const express = require('express')
const logoutRouter = express.Router()

const postLogout = require('../controller/logoutController')

logoutRouter.route('/').post(postLogout)

module.exports = logoutRouter
