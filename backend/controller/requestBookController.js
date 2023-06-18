const BookTransaction = require('../models/bookTransaction')
const BookSchema = require('../models/bookScheme')
const PopularBookSchema = require('../models/PopularBooks')
const UserSchema = require('../models/signUpModel')

// Creates a new User book request transaction
const postBooks = async (req, res) => {
  const userId = req.userId
  const username = req.username
  const userEmail = req.userEmail
  const { bookId } = req.body

  // User can request upto 5 Books
  const getUserData = await UserSchema.findById(userId)
  // Users total books issued
  const { totalBooks } = getUserData

  if (totalBooks >= 5) {
    return res
      .status(400)
      .json({ success: false, message: `Books Limit Reached` })
  }

  // Book title fetch
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
      username,
      bookTitle: title,
    })

    // Update users total issued books on 'UserDetails' collection
    const updatedTotalBooksQty = totalBooks + 1
    await UserSchema.findByIdAndUpdate(userId, {
      totalBooks: updatedTotalBooksQty,
    })

    return res.status(200).json({ success: true, data: result })
  }
}

// issueStatus (filter PENDING BooksTransaction)
const getRequestedBooks = async (req, res) => {
  const result = await BookTransaction.find({ issueStatus: 'PENDING' })
  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
}

// issueStatus (filter ACCCEPTED BooksTransaction)
const getRequestedBooksACCEPTED = async (req, res) => {
  const result = await BookTransaction.find({ issueStatus: 'ACCEPTED' })
  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
}

// Update book issue Status
const patchRequestedBooks = async (req, res) => {
  const { id, issueStatus } = req.body
  const result = await BookTransaction.findByIdAndUpdate(id, { issueStatus })

  // Fetching Book ID and Book Title for updating popular books if STATUS is ACCEPTED
  const { bookId, bookTitle } = result

  // If admin sets issueStatus to "ACCEPTED" then push that into popular books collection
  if (issueStatus === 'ACCEPTED') {
    createOrUpdatePopularBook(bookId, bookTitle)
  } else if (issueStatus === 'CANCELLED') {
    // user's id destructer to decrement total books qty for users so he can request for a new books
    const { userId } = result
    const getUserData = await UserSchema.findById(userId)

    // destructure user's total books qty and decrement by 1
    const { totalBooks } = getUserData
    const updatedTotalBooksQty = totalBooks - 1
    await UserSchema.findByIdAndUpdate(userId, {
      totalBooks: updatedTotalBooksQty,
    })
  }

  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
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

module.exports = {
  postBooks,
  getRequestedBooks,
  patchRequestedBooks,
  getRequestedBooksACCEPTED,
}
