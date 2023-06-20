const express = require('express')
const userRouter = express.Router()

const {
  getAllUsers,
  getSingleUser,
  postSingleUser,
  patchUserDetail,
} = require('../controller/userController')

const verifyToken = require('../middleware/verifyToken')

userRouter
  .route('/')
  .get(getAllUsers)
  .post(verifyToken, postSingleUser)
  .patch(verifyToken, patchUserDetail)
userRouter.route('/:userId').get(getSingleUser)

module.exports = userRouter
