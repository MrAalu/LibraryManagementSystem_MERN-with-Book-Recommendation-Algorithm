const mongoose = require('mongoose')

// defining book collection structure
const bookSchemeStructure = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book Title is Required'],
    trim: true,
  },
  image: {
    type: String, //URL for temporary
    required: false,
    default: 'Image Coming Soon',
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    default: 'Book Description Here....',
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    enum: {
      values: ['SPIRITUAL'],
      message: `{VALUE} is not supported`,
    },
    required: [true, 'Book Category is Required'],
  },
  available: {
    type: Boolean,
    default: true,
  },
})

// Pre-save middleware
// Converting Category to all UPPERCASE
bookSchemeStructure.pre('save', function (next) {
  if (this.category) {
    this.category = this.category.toUpperCase()
  }
  next()
})

module.exports = mongoose.model('BooksList', bookSchemeStructure)

// Books Properties : id,title,image,author,description,category,available
