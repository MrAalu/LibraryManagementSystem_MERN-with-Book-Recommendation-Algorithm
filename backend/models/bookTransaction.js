// Handles all the books request's

const mongoose = require('mongoose')

const BookTransaction = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  // Pending, Accepted , Cancelled
  issueStatus: {
    type: String,
    default: 'PENDING',
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  extraCharge: {
    type: Number,
    default: 0,
  },
  // when user request a default date will be set, which will be Updated when ADMIN accepts the book request
  issueDate: {
    type: Date,
    default: Date.now(),
  },
})

// Define a virtual property 'returnDate' based on 'issueDate'
BookTransaction.virtual('returnDate').get(function () {
  const issueDate = this.issueDate
  const returnDate = new Date(issueDate.getTime() + 10 * 24 * 60 * 60 * 1000) // Add 10 days in milliseconds
  return returnDate
})

module.exports = mongoose.model('booktransaction', BookTransaction)

// How to check 10+ days JS code

// // Assuming you have retrieved the date value from MongoDB
// const savedDate = new Date('2023-06-02T03:45:35.246+00:00');

// // Get the current date
// const currentDate = new Date();

// // Calculate the difference in milliseconds between the current date and the saved date
// const timeDiff = currentDate.getTime() - savedDate.getTime();

// // Convert the time difference to days
// const daysPassed = timeDiff / (1000 * 60 * 60 * 24);

// // Check if 10 days have passed
// if (daysPassed >= 10) {
//   console.log('10 days have passed since the saved date');
// } else {
//   console.log('Less than 10 days have passed since the saved date');
// }
