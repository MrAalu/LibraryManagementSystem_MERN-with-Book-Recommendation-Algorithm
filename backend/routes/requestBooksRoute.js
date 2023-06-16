const express = require('express')
const requestBookRouter = express.Router()

const { postBooks } = require('../controller/requestBookController')
const verifyToken = require('../middleware/verifyToken')

requestBookRouter.route('/').get().post(verifyToken, postBooks)

module.exports = requestBookRouter
