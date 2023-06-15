const BookList = require('../models/bookScheme')

// fetch only RANDOM 10 books (Limited Books Fetching)
const getAllFeaturedBooks = async (req, res) => {
  const result = await BookList.find({ featured: true })

  res
    .status(StatusCodes.OK)
    .json({ success: true, totalHits: result.length, data: result })
}

module.exports = { getAllFeaturedBooks }
