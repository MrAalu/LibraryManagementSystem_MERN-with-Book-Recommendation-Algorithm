const express = require('express')
const requestBookRouter = express.Router()

const verifyToken = require('../middleware/verifyToken')

const {
  postBooks,
  getRequestedBooks,
  patchRequestedBooks,
  getNotReturnedBooks,
} = require('../controller/requestBookController')

requestBookRouter
  .route('/')
  .post(verifyToken, postBooks)
  .get(verifyToken, getRequestedBooks)
  .patch(verifyToken, patchRequestedBooks)

// Not used anywhere , calm down ( wasted hours lookin for where i used this lol)
requestBookRouter.route('/notreturnedbooks').get(getNotReturnedBooks)

module.exports = requestBookRouter
