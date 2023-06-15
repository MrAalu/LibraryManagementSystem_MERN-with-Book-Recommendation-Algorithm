// handling user Logout

const express = require('express')
const logoutRouter = express.Router()

const postLogout = require('../controller/logoutController')
const verifyToken = require('../middleware/verifyToken')

logoutRouter.route('/').post(verifyToken, postLogout)

module.exports = logoutRouter
