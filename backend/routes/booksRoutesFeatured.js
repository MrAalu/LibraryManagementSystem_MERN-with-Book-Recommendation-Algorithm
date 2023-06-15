const express = require('express')
const booksRouterFeatured = express.Router()

const { getAllFeaturedBooks } = require('../controller/booksControllerFeatured')

booksRouterFeatured.route('/').get(getAllFeaturedBooks)

module.exports = booksRouterFeatured
