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
  // Extract bookId values into an array (Books user have already READED)
  const bookIdArray = filteredBooksACCEPTED.map((obj) => obj.bookId)
  // Get all books that the user has Borrowed
  const queriedBookData = await BooksModel.find({ _id: { $in: bookIdArray } })

  // Extracting user intrested category,author,language
  const categoryArray = [...new Set(queriedBookData.map((obj) => obj.category))]
  const authorArray = [...new Set(queriedBookData.map((obj) => obj.author))]
  const languageArray = [...new Set(queriedBookData.map((obj) => obj.language))]

  // ----------------------------------------------------
  // User already readed books need to be excluded
  const exludeBooksId = bookIdArray //fetch bookId of books user have already readed
  const lastBorrowedBook = await BooksModel.findOne({ _id: bookId }) //last borrowed Book

  const { category, author, language } = lastBorrowedBook

  // Find all books with same language + exclude last borrowed book
  const similarLanguageBooks = await BooksModel.find({
    language,
    available: true,
    _id: { $ne: bookId, $nin: exludeBooksId },
  })

  const similarAuthorBooks = similarLanguageBooks.filter((filter_para) => {
    return filter_para.author == author
  })

  const similarCategoryBooks = similarLanguageBooks.filter((filter_para) => {
    return filter_para.category === category && filter_para.author !== author
  })

  if (similarAuthorBooks.length <= 2) {
    const recommendationBooks = similarAuthorBooks.concat(similarCategoryBooks)
    return recommendationBooks.slice(0, 4)
  } else {
    const newAuthorBooks = similarAuthorBooks.slice(0, 2)
    const recommendationBooks = newAuthorBooks.concat(
      similarCategoryBooks.slice(0, 2)
    )
    return recommendationBooks
  }

  return similarAuthorBooks
}

// API TESTING THE ALGORITHM
const algoTest = async (req, res) => {
  const result = await analyzeUserPreferences(
    '649179774afae22ac6166b6e',
    '649682031faf3efe0d583fe6' //last purchase BookID
  )

  // Algo testing on showing BookTitle and Category for ease
  const titlesAndCategories = result.map((book) => ({
    id: book._id,
    title: book.title,
    category: book.category,
    author: book.author,
  }))

  res
    .status(200)
    .json({ totalHits: titlesAndCategories.length, titlesAndCategories })

  // query to find authors that has more than 2books in database
  //  BooksModel.aggregate([
  //    {
  //      $group: {
  //        _id: '$author',
  //        count: { $sum: 1 },
  //      },
  //    },
  //    {
  //      $match: {
  //        count: { $gt: 2 },
  //      },
  //    },
  //  ])
  //    .then((authorsWithMoreThan2Books) => {
  //      console.log(authorsWithMoreThan2Books)
  //    })
  //    .catch((error) => {
  //      console.error(error)
  //    })
}

// recommended books haru dinxa
const bookRecommendation = async () => {}

module.exports = { bookRecommendation, analyzeUserPreferences, algoTest }
