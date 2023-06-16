const express = require('express')
const popularBooksRouter = express.Router()

const { getPopularBooks } = require('../controller/popularBooksController')

popularBooksRouter.route('/').get(getPopularBooks)

module.exports = popularBooksRouter
