// Fetching similar books using Book ID

const BookModel = require('../models/bookScheme')

const fetchSimilarBooks = async (req, res) => {
  const { bookId } = req.params

  const Books = await BookModel.findById({ _id: bookId })
  const { category, language } = await Books

  const getSimilarBooks = await BookModel.find({
    _id: { $ne: bookId }, // Exclude the current Book
    category,
    available: true,
  })
    .limit(4)
    .exec()

  // If only one category from that book then fetch similar books based on Language
  if (getSimilarBooks.length === 0 || !getSimilarBooks) {
    const getSimilarBooksTwo = await BookModel.find({
      _id: { $ne: bookId }, // Exclude the current Book
      language,
      available: true,
    }).limit(4)

    return res.status(200).json({ success: true, data: getSimilarBooksTwo })
  }

  return res.status(200).json({ success: true, data: getSimilarBooks })
}

module.exports = { fetchSimilarBooks }
