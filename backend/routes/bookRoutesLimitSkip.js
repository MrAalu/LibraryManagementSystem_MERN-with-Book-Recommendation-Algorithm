const express = require('express')
const bookRoutesLimitSkip = express.Router()

const { getAllLimitedBooks } = require('../controller/booksControllerLimitSkip')

bookRoutesLimitSkip.route('/').get(getAllLimitedBooks)

module.exports = bookRoutesLimitSkip
