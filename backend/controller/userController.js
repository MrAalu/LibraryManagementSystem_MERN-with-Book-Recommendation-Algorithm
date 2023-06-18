const UserModel = require('../models/signUpModel')
const BookTransactionSchema = require('../models/bookTransaction')

// Fetch all USERS data
const getAllUsers = async (req, res) => {
  const result = await UserModel.find({ userType: 'normal_user' })

  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
}

// Fetch single user data + book transactions
const getSingleUser = async (req, res) => {
  const { userId } = req.params

  const getUserData = await UserModel.findById(userId)

  const getUserBookTransaction = await BookTransactionSchema.find({
    userId,
    issueStatus: { $in: ['PENDING', 'ACCEPTED'] },
  })

  res.status(200).json({
    success: true,
    bookData: getUserBookTransaction,
    userData: getUserData,
  })
}

module.exports = { getAllUsers, getSingleUser }
