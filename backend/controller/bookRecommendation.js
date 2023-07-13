// Functionality of this Javascript code is to generate recommendation books for user based on content based filtering
const UserPreferenceModel = require('../models/UserPreferencesModel')
const UserModel = require('../models/signUpModel')
const BooksModel = require('../models/bookScheme')
const BookTransactionModel = require('../models/bookTransaction')
const PopularBookModel = require('../models/PopularBooks')

// used in BookRequest updated by admin 'patchRequestedBooks' , admin issue book to user 'postIssueBooks'
const analyzeUserPreferences = async (userId, bookId) => {
  // Fetch all BookId ,this user has Previously Borrowed (IssueStatus - ACCEPTED)
  const userBookDetails = await BookTransactionModel.find({ userId })

  // Filter objects with issueStatus set to 'ACCEPTED'
  const filteredBooksACCEPTED = userBookDetails.filter(
    (obj) => obj.issueStatus === 'ACCEPTED'
  )
  // Extract bookId values into an array
  const bookIdArray = filteredBooksACCEPTED.map((obj) => obj.bookId)
  // Get all books that the user has Borrowed
  const queriedBookData = await BooksModel.find({ _id: { $in: bookIdArray } })

  // Extracting user intrested category,author,language
  const categoryArray = [...new Set(queriedBookData.map((obj) => obj.category))]
  const authorArray = [...new Set(queriedBookData.map((obj) => obj.author))]
  const languageArray = [...new Set(queriedBookData.map((obj) => obj.language))]

  // ----------------------------------------------------
  // User already readed books need to be excluded
  const exludeBooksId = filteredBooksACCEPTED.map((obj) => obj.bookId) //fetch bookId of books user have already readed
  const lastBorrowedBook = await BooksModel.findOne({ _id: bookId }) //last borrowed Book
}

// API TESTING THE ALGORITHM
const algoTest = async (req, res) => {
  analyzeUserPreferences(
    '649179774afae22ac6166b6e',
    '647979321de41547d0528e9a' //last purchase BookID
  )

  res.send('Work')
}

// recommended books haru dinxa
const bookRecommendation = async () => {}

module.exports = { bookRecommendation, analyzeUserPreferences, algoTest }
