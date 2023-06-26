const express = require('express')
const requestBookRouter = express.Router()

// Middleware
const adminAuthorization = require('../middleware/adminAuth')

const {
  postBooks,
  getRequestedBooks,
  patchRequestedBooks,
  getNotReturnedBooks,
  postIssueBooks,
} = require('../controller/requestBookController')

requestBookRouter
  .route('/')
  .post(postBooks)
  .get(getRequestedBooks)
  .patch(patchRequestedBooks)

// Used to Fetch books that are not returned in TIME
requestBookRouter
  .route('/notreturnedbooks')
  .get(adminAuthorization, getNotReturnedBooks)

// admin issue book to User
requestBookRouter.route('/issuebook').post(adminAuthorization, postIssueBooks)

module.exports = requestBookRouter
