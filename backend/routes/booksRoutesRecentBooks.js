const express = require('express')
const booksRouterRecentBooks = express.Router()

const {
  getAllRecentBooks,
} = require('../controller/booksControllerRecentBooks')

booksRouterRecentBooks.route('/').get(getAllRecentBooks)

module.exports = booksRouterRecentBooks
