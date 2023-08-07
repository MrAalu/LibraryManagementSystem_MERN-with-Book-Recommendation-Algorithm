const express = require('express')
const SimilarBooksRouter = express.Router()
const { fetchSimilarBooks } = require('../controller/similarBooksController')

SimilarBooksRouter.route('/:bookId').get(fetchSimilarBooks)

module.exports = SimilarBooksRouter
