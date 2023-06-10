const express = require('express')
const filterRouter = express.Router()

const { getFilterData } = require('../controller/filterController')
const verifyToken = require('../middleware/verifyToken')

filterRouter.route('/').get(getFilterData)

module.exports = filterRouter
