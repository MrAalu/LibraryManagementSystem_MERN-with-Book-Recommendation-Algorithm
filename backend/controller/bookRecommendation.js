const { analyzeUserPreferences } = require('./bookRecommendationAlgorithm')
const UserLastBookModel = require('../models/userLastBook')

const getRecommendedBooks = async (req, res) => {
  const userId = req.userId

  const userLastBook = await UserLastBookModel.findOne({ userId })
  const { lastBorrowedBookId } = userLastBook

  const result = await analyzeUserPreferences(userId, lastBorrowedBookId)

  res.status(200).json({ totalHits: result.length, data: result })
}

module.exports = { getRecommendedBooks }
