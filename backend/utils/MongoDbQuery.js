// Changes all Books language into UPPERCASE
const BookModel = require('../models/bookScheme') // Replace with the path to your MongoDB model

const QueryRouter = require('express').Router()

const convertLanguagesToUppercase = async (req, res) => {
  const allBooks = await BookModel.find({})

  for (const book of allBooks) {
    book.language = book.language.toUpperCase()
    await book.save()
  }

  console.log(
    `Updated ${allBooks.length} books. Languages converted to uppercase successfully.`
  )

  res.status(400).json({ success: true })
}

QueryRouter.route('').get(convertLanguagesToUppercase)

// Call the function to convert languages to uppercase
module.exports = QueryRouter
