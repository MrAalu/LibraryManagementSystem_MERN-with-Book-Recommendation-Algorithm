// controlling login Methods

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// SignUp model ma vako scheme use garera login credentials CrossCheck
const UserModels = require('../models/signUpModel')

// For EMAIL verification
const { generateOtp, maskEmail, sendEmail } = require('./signUpController')
const UserOtpVerificationModel = require('../models/userOtpVerificationModel')

const postUserLogin = async (req, res) => {
  // converting @gmail.com domain into lowercase to match with database
  const email = await ConvertEmail(req.body.email)

  const result = await UserModels.findOne({ email: email }).select('+password')

  if (!result) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: `Invalid email or password` })
  }

  const validate_password = await bcrypt.compare(
    req.body.password,
    result.password
  )
  if (!validate_password) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: 'Invalid email or password' })
  }

  // After Email & Password matches then,check if email is verified or not
  if (result.emailVerified === false) {
    const userId = result.id

    const otp_Code = Math.floor(Math.random() * 9000 + 1000)
    const hashed_otpCode = await generateOtp(otp_Code)

    res.cookie('otp-cookie', userId, {
      path: '/', //1000ms * sec * min * hr ->
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24hr otp cookie that stores userId
      httpOnly: true,
      sameSite: 'lax',
    })

    await UserOtpVerificationModel.findOneAndUpdate(
      { userId: userId },
      {
        otpCode: hashed_otpCode,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60),
      }
    )

    const maskedEmail = await maskEmail(email)

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Email not Verified ! OTP Verification code re-sended to email ${maskedEmail}`,
      ENTER_OTP: true,
    })

    await sendEmail(email, otp_Code)
  }

  // Generating json web token on success login
  const jwt_token = await jwt.sign(
    {
      id: result._id,
      username: result.username,
      email,
      userType: result.userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFE,
    }
  )

  res.cookie('access-cookie', jwt_token, {
    path: '/',
    //1000ms * sec * min * hr ->
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,

    // allows get request from same site or external site but , POST from external sites cookie wont be sent
    sameSite: 'lax',
  })

  // Generating Refresh Token
  const refresh_token = await jwt.sign(
    {
      id: result._id,
      username: result.username,
      email,
      userType: result.userType,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_LIFE,
    }
  )

  res.cookie('refresh-cookie', refresh_token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), //365days Cookie Expiry
    httpOnly: true,
    sameSite: 'lax',
  })

  return res.status(StatusCodes.OK).json({
    success: true,
    userType: result.userType,
  })
}

// Converting @gmail.com to lower
const ConvertEmail = async (email) => {
  const emailWithoutSpaces = email.replace(/\s/g, '') // Remove spaces using regular expression
  const emailParts = emailWithoutSpaces.split('@')
  const firstEmailPart = emailParts[0]
  const secondEmailPart = emailParts[1].toLowerCase()

  return (FinalEmail = firstEmailPart + '@' + secondEmailPart)
}

module.exports = postUserLogin
