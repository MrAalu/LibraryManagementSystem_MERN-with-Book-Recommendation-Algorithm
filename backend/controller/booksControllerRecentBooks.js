const BookList = require('../models/bookScheme')

// fetch only 4 books based on DATE (Latest/Recently ADDED books Fetching)
const getAllRecentBooks = async (req, res) => {
  const result = await BookList.find().sort({ createdAdded: -1 }).limit(4)

  res
    .status(StatusCodes.OK)
    .json({ success: true, totalHits: result.length, data: result })
}

module.exports = { getAllRecentBooks }
