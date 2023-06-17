const express = require('express')
const userRouter = express.Router()

const { getAllUsers } = require('../controller/userController')

userRouter.route('/').get(getAllUsers)

module.exports = userRouter
