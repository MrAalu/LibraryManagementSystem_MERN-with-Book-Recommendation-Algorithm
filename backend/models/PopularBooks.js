const mongoose = require('mongoose')

const PopularBookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  issueQuantity: {
    type: Number,
    default: 1,
  },
})

module.exports = mongoose.model('PopularBook', PopularBookSchema)
