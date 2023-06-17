const UserModel = require('../models/signUpModel')

const getAllUsers = async (req, res) => {
  const result = await UserModel.find({ userType: 'normal_user' })

  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
}

module.exports = { getAllUsers }
