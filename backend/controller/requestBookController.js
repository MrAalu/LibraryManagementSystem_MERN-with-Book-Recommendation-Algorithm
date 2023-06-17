const BookTransaction = require('../models/bookTransaction')
const BookSchema = require('../models/bookScheme')
const PopularBookSchema = require('../models/PopularBooks')

// Creates a new User book request transaction
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

    createOrUpdatePopularBook(bookId, title)

    return res.status(200).json({ success: true, data: result })
  }
}

// POPULAR BOOKS TRACKING FUNCTION
const createOrUpdatePopularBook = async (bookId, bookTitle) => {
  const checkPopularBook = await PopularBookSchema.findOne({ bookId })

  if (!checkPopularBook) {
    // If book does not exist in popular collection, create a new one
    await PopularBookSchema.create({
      bookId,
      bookTitle,
    })
  } else {
    // If book already exists in popular collection, increment issueQuantity
    const updatedIssueQuantity = checkPopularBook.issueQuantity + 1

    await PopularBookSchema.findOneAndUpdate(
      { bookId },
      { issueQuantity: updatedIssueQuantity },
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation rules on update
      }
    )
  }
}

// handles Book Request issueStatus (Fetches Pending Requests)
const getRequestedBooks = async (req, res) => {
  const result = await BookTransaction.find({ issueStatus: 'PENDING' })

  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
}

// Update book issue Status
const patchRequestedBooks = async (req, res) => {
  const { id, issueStatus } = req.body
  const result = await BookTransaction.findByIdAndUpdate(id, { issueStatus })

  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
}

module.exports = { postBooks, getRequestedBooks, patchRequestedBooks }
