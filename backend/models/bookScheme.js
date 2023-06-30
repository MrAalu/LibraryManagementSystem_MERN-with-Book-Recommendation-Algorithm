const mongoose = require('mongoose')

// defining book collection structure
const bookSchemeStructure = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book Title is Required'],
    trim: true,
  },
  image: {
    type: String, //Image File path stored here
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    required: [true, 'Book Category is Required'],
  },
  available: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  createdAdded: {
    type: Date,
    default: Date.now(),
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
