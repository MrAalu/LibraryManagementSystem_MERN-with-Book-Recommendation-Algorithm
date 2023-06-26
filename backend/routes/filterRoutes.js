const express = require('express')
const filterRouter = express.Router()

const { getFilterData } = require('../controller/filterController')

filterRouter.route('/').get(getFilterData)

module.exports = filterRouter
