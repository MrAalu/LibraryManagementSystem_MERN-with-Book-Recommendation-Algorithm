const BookList = require('../models/bookScheme')

// fetch only RANDOM 10 books (Limited Books Fetching)
const getAllLimitedBooks = async (req, res) => {
  const fetchLimit = 8
  const { page } = req.query
  const pageNumber = Number(page)

  if (!pageNumber || pageNumber == 1) {
    const result = await BookList.find().limit(fetchLimit)
    return res
      .status(StatusCodes.OK)
      .json({ success: true, totalHits: result.length, data: result })
  } else {
    const skipFetch = (pageNumber - 1) * fetchLimit
    const result = await BookList.find().limit(fetchLimit).skip(skipFetch)
    return res
      .status(StatusCodes.OK)
      .json({ success: true, totalHits: result.length, data: result })
  }
}

module.exports = { getAllLimitedBooks }
