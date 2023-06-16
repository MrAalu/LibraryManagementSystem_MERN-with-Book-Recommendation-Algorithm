const BookTransaction = require('../models/bookTransaction')
const BookSchema = require('../models/bookScheme')

const postBooks = async (req, res) => {
  const userId = req.userId
  const userEmail = req.userEmail
  const { bookId } = req.body

  const bookDetails = await BookSchema.findById(bookId)
  const { title } = bookDetails

  // Check if user has previously requested for same book with id
  const checkPrevRequest = await BookTransaction.findOne({ userId, bookId })

  if (checkPrevRequest) {
    return res
      .status(400)
      .json({ success: false, message: `Book already Requested` })
  } else {
    const result = await BookTransaction.create({
      userId,
      bookId,
      userEmail,
      bookTitle: title,
    })

    return res.status(200).json({ success: true, data: result })
  }
}

module.exports = { postBooks }
