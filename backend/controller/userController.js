const UserModel = require('../models/signUpModel')
const BookTransactionSchema = require('../models/bookTransaction')

// Fetch all USERS data
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

    // PENDING & ACCEPTED only issueStatus fetch
    issueStatus: { $in: ['PENDING', 'ACCEPTED'] },
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

module.exports = { getAllUsers, getSingleUser, postSingleUser }
