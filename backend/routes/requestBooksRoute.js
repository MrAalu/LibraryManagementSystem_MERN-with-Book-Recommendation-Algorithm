const express = require('express')
const requestBookRouter = express.Router()

const verifyToken = require('../middleware/verifyToken')

const {
  postBooks,
  getRequestedBooks,
  patchRequestedBooks,
} = require('../controller/requestBookController')

requestBookRouter
  .route('/')
  .post(verifyToken, postBooks)
  .get(verifyToken, getRequestedBooks)
  .patch(verifyToken, patchRequestedBooks)

module.exports = requestBookRouter
