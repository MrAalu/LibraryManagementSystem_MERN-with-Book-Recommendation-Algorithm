const express = require('express')
const UpdateUserEmailRouter = express.Router()

const updateUserEmail = require('../controller/updateClientEmailController')

UpdateUserEmailRouter.route('').post(updateUserEmail)

module.exports = UpdateUserEmailRouter
