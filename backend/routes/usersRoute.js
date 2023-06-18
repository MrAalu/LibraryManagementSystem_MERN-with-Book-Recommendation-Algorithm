const express = require('express')
const userRouter = express.Router()

const { getAllUsers, getSingleUser } = require('../controller/userController')

userRouter.route('/').get(getAllUsers)
userRouter.route('/:userId').get(getSingleUser)

module.exports = userRouter
