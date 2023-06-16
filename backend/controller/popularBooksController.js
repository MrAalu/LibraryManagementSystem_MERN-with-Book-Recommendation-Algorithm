// Finds Popular books

const PopularBookSchema = require('../models/PopularBooks')
const BookSchema = require('../models/bookScheme')

const getPopularBooks = async (req, res) => {
  const fetchPopularBooks = await PopularBookSchema.find()
    .sort({ issueQuantity: -1 })
    .limit(4)

  // Mapping out bookId only and storing it
  const bookIds = fetchPopularBooks.map((book) => book.bookId)

  // using bookId's to get all book data's that has same book ID
  // $in operator -> _id is in the bookIds array
  const result = await BookSchema.find({ _id: { $in: bookIds } })

  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
}

module.exports = { getPopularBooks }
