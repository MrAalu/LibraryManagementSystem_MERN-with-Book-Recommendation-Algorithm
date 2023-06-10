const express = require('express')
const AdminRouter = express.Router()

AdminRouter.route('/').get()

module.exports = AdminRouter
