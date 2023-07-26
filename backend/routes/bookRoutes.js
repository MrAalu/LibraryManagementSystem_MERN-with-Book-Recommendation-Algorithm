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

// Middlewares
const verifyToken = require('../middleware/verifyToken')
const adminAuthorization = require('../middleware/adminAuth')
const updateBookImage = require('../controller/bookImageUpdateController')

booksRouter
  .route('/')
  .get(getAllBooks)
  .post(verifyToken, adminAuthorization, upload.single('image'), postBook)

booksRouter
  .route('/:id')
  .get(getSingleBook)
  .patch(verifyToken, adminAuthorization, patchBook)
  .delete(verifyToken, adminAuthorization, deleteBook)

// Updating book Image
// Old Image File location replaced with new image file location and old image file is deleted from 'uploads' folder
booksRouter
  .route('/updateImage/:id')
  .patch(
    verifyToken,
    adminAuthorization,
    upload.single('image'),
    updateBookImage
  )

module.exports = booksRouter
