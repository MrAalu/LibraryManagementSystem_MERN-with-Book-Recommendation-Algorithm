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

userRouter
  .route('/')
  .get(adminAuthorization, getAllUsers)
  .post(postSingleUser)
  .patch(patchUserDetail)

userRouter.route('/:userId').get(getSingleUser)

module.exports = userRouter
