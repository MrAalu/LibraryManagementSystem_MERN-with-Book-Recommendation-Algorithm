const express = require('express')
const userRouter = express.Router()

const {
  getAllUsers,
  getSingleUser,
  postSingleUser,
} = require('../controller/userController')

const verifyToken = require('../middleware/verifyToken')

userRouter.route('/').get(getAllUsers).post(verifyToken, postSingleUser)
userRouter.route('/:userId').get(getSingleUser)

module.exports = userRouter
