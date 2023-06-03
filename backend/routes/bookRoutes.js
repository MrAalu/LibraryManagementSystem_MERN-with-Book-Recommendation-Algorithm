const express = require('express')
const booksRouter = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const {
  getAllBooks,
  postBook,
  getSingleBook,
  patchBook,
  deleteBook,
} = require('../controller/booksController')

booksRouter.route('/').get(getAllBooks).post(upload.single('image'), postBook)
booksRouter.route('/:id').get(getSingleBook).patch(patchBook).delete(deleteBook)

module.exports = { booksRouter }
