const express = require('express')
const booksRouter = express.Router()

const {
  getAllBooks,
  postBook,
  getSingleBook,
  patchBook,
  deleteBook,
} = require('../controller/booksController')

// Parse JSON
booksRouter.use(express.json())

booksRouter.route('/').get(getAllBooks).post(postBook)
booksRouter.route('/:id').get(getSingleBook).patch(patchBook).delete(deleteBook)

module.exports = { booksRouter }
