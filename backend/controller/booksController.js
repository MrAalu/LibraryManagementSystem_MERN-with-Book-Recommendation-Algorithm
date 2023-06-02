const TryCatchWrapper = require('../errorHandler/TryCatchBoiler')
const BookList = require('../models/bookScheme')

// fetch all books
const getAllBooks = TryCatchWrapper(async (req, res) => {
  const result = await BookList.find({})
  res
    .status(200)
    .json({ success: true, totalHits: result.length, data: result })
})

// add new book
const postBook = TryCatchWrapper(async (req, res) => {
  const result = await BookList.create(req.body)
  res.status(201).json({ success: true, data: result })
})

// fetch single book by ID
const getSingleBook = TryCatchWrapper(async (req, res) => {
  const { id: bookID } = req.params
  const result = await BookList.findById({ _id: bookID })

  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    })
  }

  res.status(200).json({ success: true, data: result })
})

// update single book detail
const patchBook = TryCatchWrapper(async (req, res) => {
  const { id: bookID } = req.params

  const result = await BookList.findByIdAndUpdate({ _id: bookID }, req.body, {
    // Instant Update or else 1step delay output hunxa + rechecking the validation for updated Values
    new: true,
    runValidators: true,
  })

  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    })
  }

  res.status(200).json({ success: true, data: result })
})

// delete single book by id
const deleteBook = TryCatchWrapper(async (req, res) => {
  const { id: bookID } = req.params
  const result = await BookList.findByIdAndDelete({ _id: bookID })

  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    })
  }

  res.status(200).json({ status: 'success', data: null })
})

module.exports = { getAllBooks, postBook, getSingleBook, patchBook, deleteBook }
