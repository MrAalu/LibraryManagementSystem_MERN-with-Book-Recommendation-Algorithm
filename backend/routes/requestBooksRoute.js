const express = require('express')
const requestBookRouter = express.Router()

const verifyToken = require('../middleware/verifyToken')

const {
  postBooks,
  getRequestedBooks,
  patchRequestedBooks,
  getRequestedBooksACCEPTED,
} = require('../controller/requestBookController')

requestBookRouter
  .route('/')
  .post(verifyToken, postBooks)
  .get(verifyToken, getRequestedBooks)
  .patch(verifyToken, patchRequestedBooks)

requestBookRouter
  .route('/acceptedbooks')
  .get(verifyToken, getRequestedBooksACCEPTED)

module.exports = requestBookRouter
