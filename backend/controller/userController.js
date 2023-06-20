const UserModel = require('../models/signUpModel')
const BookTransactionSchema = require('../models/bookTransaction')
const bcrypt = require('bcrypt')

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
const postSingleUser = async (req, res) => {
  const userId = req.userId

  const getUserData = await UserModel.findById(userId)

  // Fetch all 3 Status to show users - ACCEPTED / PENDING / CANCELLED
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
    const result = await UserModel.findByIdAndUpdate(
      userId,
      { username, email, phone },
      {
        new: true,
        runValidators: true,
      }
    )
    return res.status(200).json({ success: true, data: result })
  }

  // Updates Password
  if (old_password && new_password) {
    const getPassword = await UserModel.findById({ _id: userId }).select(
      '+password'
    )

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

module.exports = { getAllUsers, getSingleUser, postSingleUser, patchUserDetail }
