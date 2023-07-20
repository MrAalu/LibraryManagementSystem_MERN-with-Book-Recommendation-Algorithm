const mongoose = require('mongoose')

const UserOtpVerificationModel = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  otpCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model(
  'userEmailVerification',
  UserOtpVerificationModel
)
