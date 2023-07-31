// Functionality of this Javascript code is to generate recommendation books for user based on content based filtering

const BooksModel = require('../models/bookScheme')
const BookTransactionModel = require('../models/bookTransaction')

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

  if (!categoryArray.includes(category)) {
    categoryArray.push(category)
  }
  if (!languageArray.includes(language)) {
    languageArray.push(language)
  }
  if (!authorArray.includes(author)) {
    authorArray.push(author)
  }
  // console.log(categoryArray, languageArray, authorArray)
  // console.log(exludeBooksId)

  // Find all books with same language + exclude last borrowed book
  let similarLanguageBooks = await BooksModel.find({
    available: true,
    language: { $in: languageArray },
    _id: { $ne: bookId, $nin: exludeBooksId },
  })
  // console.log(similarLanguageBooks.length)

  const similarAuthorBooks = similarLanguageBooks.filter((filter_para) => {
    return filter_para.author == author
  })
  // console.log(similarAuthorBooks.length)

  // Filter books that matches users past book category preferences && filter out books of author that user just borrowed(duplication control of same authors book,we have fetched it on above code)
  const similarCategoryBooks = similarLanguageBooks.filter((filter_para) => {
    return (
      categoryArray.includes(filter_para.category) &&
      filter_para.author !== author
    )
  })
  // console.log(similarCategoryBooks.length)

  if (similarAuthorBooks.length <= 2) {
    let recommendationBooks = similarAuthorBooks.concat(similarCategoryBooks)
    recommendationBooks = recommendationBooks.slice(0, 4)

    // If we have less than 4 books to recommend than we recommend books based on language
    if (recommendationBooks.length < 4) {
      // This function handles if recommended books are less than 4
      let updatedBooks = similarLanguageBooks.filter((filter_para) => {
        // exclude same authors to control repeatation
        return filter_para.author !== authorArray.includes(filter_para.author)
      })

      updatedBooks = similarLanguageBooks.filter((book) => {
        // Exclude books with ids that are already in the recommendationBooks array
        if (
          recommendationBooks.some((recBook) => recBook._id.equals(book._id))
        ) {
          return false
        }

        return true
      })
      recommendationBooks = recommendationBooks.concat(updatedBooks).slice(0, 4)
      return recommendationBooks
    }
  }

  const newAuthorBooks = similarAuthorBooks.slice(0, 2)
  let recommendationBooks = newAuthorBooks.concat(similarCategoryBooks)
  recommendationBooks = recommendationBooks.slice(0, 4)

  return recommendationBooks
}

// API TESTING THE ALGORITHM
const algoTest = async (req, res) => {
  const result = await analyzeUserPreferences(
    '649179774afae22ac6166b6e', //user ko ID
    '64967c201faf3efe0d583f2e' //last purchase BookID
  )

  // Algo testing on showing BookTitle and Category for ease
  const titlesAndCategories = result.map((book) => ({
    id: book._id,
    title: book.title,
    category: book.category,
    author: book.author,
  }))

  res.status(200).json({
    totalHits: titlesAndCategories.length,
    recommendedBooks: titlesAndCategories,
  })
}

module.exports = { analyzeUserPreferences, algoTest }

// query to find authors that has more than 2books in database
// BooksModel.aggregate([
//   {
//     $group: {
//       _id: '$author',
//       count: { $sum: 1 },
//     },
//   },
//   {
//     $match: {
//       count: { $gt: 1 },
//     },
//   },
// ])
//   .then((authorsWithMoreThan2Books) => {
//     console.log(authorsWithMoreThan2Books)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
