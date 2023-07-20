// This is the User's Module
const mongoose = require('mongoose')

const signUpScheme = mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: [true, 'email already exists'],

    validate: {
      // only accepts @gmail.com in email
      validator: function (value) {
        // Custom email validation logic
        // return /^[\w-]+@gmail\.com$/i.test(value)
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(value)
        // test() method checks value matches or not and returns 'true' and 'false'
      },
      message: 'Invalid email format. Only @gmail.com addresses are allowed.',
    },
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    validate: {
      // Validating if Phone no. starts with '9' or not
      validator: function (value) {
        return /^9\d{9}$/.test(value)
      },
      message: 'Invalid phone number format.',
    },
  },
  userType: {
    type: String,
    default: 'normal_user',
  },
  totalRequestedBooks: {
    type: Number,
    default: 0,
  },
  totalAcceptedBooks: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
})

// Pre-save hook to convert input values to lowercase/uppercase
signUpScheme.pre('save', function (next) {
  this.username = this.username.toLowerCase()

  // Converting only domain `@gmail.com` to lowerCase
  const emailParts = this.email.split('@')
  const firstEmailPart = emailParts[0]
  const secondEmailPart = emailParts[1].toLowerCase()

  this.email = firstEmailPart + '@' + secondEmailPart

  next()
})

module.exports = mongoose.model('UserDetails', signUpScheme)
