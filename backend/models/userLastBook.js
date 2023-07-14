// this model stores user's last borrowed book so it can be used for recommendation algorithm

const mongoose = require('mongoose')

const UserLastBook = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  lastBorrowedBookTitle: {
    type: String,
    required: true,
  },
  lastBorrowedBookId: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('userlastbook', UserLastBook)
