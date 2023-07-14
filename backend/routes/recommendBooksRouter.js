const express = require('express')
const recommendedBooksRouter = express.Router()

const { getRecommendedBooks } = require('../controller/bookRecommendation')

recommendedBooksRouter.route('/').get(getRecommendedBooks)

module.exports = recommendedBooksRouter
