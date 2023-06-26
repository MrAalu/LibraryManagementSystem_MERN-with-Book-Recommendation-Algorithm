const express = require('express')
const userRouter = express.Router()

// Middleware
const adminAuthorization = require('../middleware/adminAuth')

const {
  getAllUsers,
  getSingleUser,
  postSingleUser,
  patchUserDetail,
} = require('../controller/userController')

const verifyToken = require('../middleware/verifyToken')

userRouter
  .route('/')
  .get(adminAuthorization, getAllUsers)
  .post(verifyToken, postSingleUser)
  .patch(verifyToken, patchUserDetail)

userRouter.route('/:userId').get(getSingleUser)

module.exports = userRouter
