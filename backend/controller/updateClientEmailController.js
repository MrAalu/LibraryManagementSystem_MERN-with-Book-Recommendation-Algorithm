// This controller allows admin to Update users Email

const UserOtpVerificationModel = require('../models/userOtpVerificationModel')
const UserModel = require('../models/signUpModel')

const {
  verifyEmail,
  resendOtpCode,
  generateOtp,
  sendEmail,
  maskEmail,
} = require('./signUpController')

const updateUserEmail = async (req, res) => {
  const { userId, newEmail } = req.body

  const otp_Code = Math.floor(Math.random() * 9000 + 1000)

  const hashed_otpCode = await generateOtp(otp_Code)

  const maskedEmail = await maskEmail(newEmail)

  await UserOtpVerificationModel.findOneAndUpdate(
    { userId },
    {
      userEmail: newEmail,
      otpCode: hashed_otpCode,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60),
    }
  )

  res.cookie('otp-cookie', userId, {
    path: '/', //1000ms * sec * min * hr ->
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24hr otp cookie that stores userId
    httpOnly: true,
    sameSite: 'lax',
  })

  await UserModel.findByIdAndUpdate({ _id: userId }, { email: newEmail })

  res.status(200).json({
    success: true,
    message: `Verify Email,OTP Verification code sended to email ${maskedEmail}`,
    ENTER_OTP: true,
  })

  await sendEmail(newEmail, otp_Code)
}

module.exports = updateUserEmail
