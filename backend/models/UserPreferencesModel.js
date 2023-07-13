// This model stores all the User Book preferences to Generate the RECOMMENDED Books

const mongoose = require('mongoose')

const UserPreferenceModel = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  book_category: {
    type: String,
  },
  book_author: {
    type: String,
  },
  book_language: {
    type: String,
  },
  recent_bookId: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('UserPreference', UserPreferenceModel)
