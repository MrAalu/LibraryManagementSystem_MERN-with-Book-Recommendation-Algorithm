const express = require('express')
const BookTransactionSchema = require('../models/bookTransaction')
const CheckBookReturnRouter = express.Router()

const runBookReturnCheck = async (req, res) => {
  await checkBookReturn()
  res.status(200).json({ success: true, message: `Book Fine Charges Checked` })
}

CheckBookReturnRouter.route('/').get(runBookReturnCheck)

// This API is to be called everytime ADMIN / CLIENT logs in
// Update Extra charge (PRICE) of entire booktransaction if returnDate is passed and isReturned is still False
const checkBookReturn = async () => {
  try {
    // Find the book transactions where returnDate is passed and isReturned is false
    const overdueTransactions = await BookTransactionSchema.find({
      // less than new date + isReturned false condition
      returnDate: { $lt: new Date() },
      isReturned: false,
    })

    // Update the extraCharge field for overdue transactions
    overdueTransactions.forEach((transaction) => {
      if (transaction.extraCharge === 0) {
        transaction.extraCharge += 100
        transaction.save()
      }
    })
  } catch (error) {
    console.error('Error updating book Fine CHARGE : ', error)
  }
}

module.exports = CheckBookReturnRouter
