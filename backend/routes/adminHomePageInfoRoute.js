const express = require('express')
const adminHomePageInfoRouter = express.Router()

const adminHomePageInfoController = require('../controller/adminHomeInfoController')

adminHomePageInfoRouter.route('/').get(adminHomePageInfoController)

module.exports = adminHomePageInfoRouter
