const UserModel = require('../models/signUpModel')
const BookTransactionSchema = require('../models/bookTransaction')
const bcrypt = require('bcrypt')

// For EMAIL verification
const { generateOtp, maskEmail, sendEmail } = require('./signUpController')
const UserOtpVerificationModel = require('../models/userOtpVerificationModel')
const postLogout = require('./logoutController')

// Fetch all USERS data + check book return status and FINE Charge
const getAllUsers = async (req, res) => {
  const result = await UserModel.find({ userType: 'normal_user' })

  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
}

// Fetch single user data + book transactions using /Params
const getSingleUser = async (req, res) => {
  const { userId } = req.params

  const getUserData = await UserModel.findById(userId)

  const getUserBookTransaction = await BookTransactionSchema.find({
    userId,
    issueStatus: 'ACCEPTED',
    // PENDING & ACCEPTED only issueStatus fetch
    // issueStatus: { $in: ['PENDING', 'ACCEPTED'] },
  })

  // Fetch all 3 Status to show users - ACCEPTED / PENDING / CANCELLED
  const getAllUserBookTransaction = await BookTransactionSchema.find({
    userId,
  })

  res.status(200).json({
    success: true,
    bookData: getUserBookTransaction,
    userData: getUserData,
    bookDataAll: getAllUserBookTransaction,
  })
}

// Fetch single user data + book transactions using POST method with empty body (COOKIE)
// Gives back UserDetails
const postSingleUser = async (req, res) => {
  const userId = req.userId

  const getUserData = await UserModel.findById(userId)

  // Fetch all 3 Status to show users - ACCEPTED / PENDING / CANCELLED / READY
  const getAllUserBookTransaction = await BookTransactionSchema.find({
    userId,
  })

  res.status(200).json({
    success: true,
    userData: getUserData,
    bookDataAll: getAllUserBookTransaction,
  })
}

// Update User Details (CLIENT SIDE)
const patchUserDetail = async (req, res) => {
  const userId = req.userId
  const { username, email, phone, old_password, new_password } = req.body

  // Updates Username,email and phone
  if (username && email && phone) {
    const UserDetails = await UserModel.findById({ _id: userId })
    const { email: oldEmail } = UserDetails
    const newEmail = await ConvertEmail(email)

    // if email is still same ,update username , phone
    if (oldEmail == newEmail) {
      const result = await UserModel.findByIdAndUpdate(
        userId,
        { username, phone },
        {
          new: true,
          runValidators: true,
        }
      )
      return res.status(200).json({ success: true, data: result })

      // If user gives new Email
    } else {
      const cookiesToClear = ['access-cookie', 'otp-cookie', 'refresh-cookie']

      // Loop through the array of cookie names and clear each one
      cookiesToClear.forEach((cookieName) => {
        res.clearCookie(cookieName)
      })

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
          userEmail: newEmail,
          otpCode: hashed_otpCode,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 1000 * 60),
        }
      )

      await UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          email: newEmail,
          emailVerified: false,
          username,
          phone,
        },
        {
          new: true,
          runValidators: true,
        }
      )

      const maskedEmail = await maskEmail(newEmail)

      res.status(StatusCodes.OK).json({
        success: true,
        message: `Verify Email ! OTP Verification code sended to email ${maskedEmail}`,
        ENTER_OTP: true,
      })

      await sendEmail(newEmail, otp_Code)
    }
  }

  // Updates Password
  if (old_password && new_password) {
    const getPassword = await UserModel.findById({ _id: userId }).select(
      '+password'
    )

    // Alphanumeric password validation with Special character
    const alphanumericRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

    if (!new_password.match(alphanumericRegex)) {
      return res.status(400).json({
        success: true,
        message:
          'Password must be alphanumeric and contain at least one special character.',
      })
    }

    const comparePassword = await bcrypt.compare(
      old_password,
      getPassword.password
    )

    // If Password Matches
    if (comparePassword) {
      // hash password before updating
      const updatedPassword = await bcrypt.hash(new_password, 10)
      const result = await UserModel.findByIdAndUpdate(
        userId,
        { password: updatedPassword },
        {
          new: true,
          runValidators: true,
        }
      )
      return res.status(200).json({ success: true, data: result })
    } else {
      return res
        .status(400)
        .json({ success: false, message: `Invalid Password` })
    }
  }
}

// Converting @gmail.com to lower
const ConvertEmail = async (email) => {
  const emailWithoutSpaces = email.replace(/\s/g, '') // Remove spaces using regular expression
  const emailParts = emailWithoutSpaces.split('@')
  const firstEmailPart = emailParts[0]
  const secondEmailPart = emailParts[1].toLowerCase()

  return (FinalEmail = firstEmailPart + '@' + secondEmailPart)
}

module.exports = { getAllUsers, getSingleUser, postSingleUser, patchUserDetail }
