const BookList = require('../models/bookScheme')

// fetch only RANDOM 10 books (Limited Books Fetching)
const getAllLimitedBooks = async (req, res) => {
  const result = await BookList.find().limit(8)

  res
    .status(StatusCodes.OK)
    .json({ success: true, totalHits: result.length, data: result })
}

module.exports = { getAllLimitedBooks }
