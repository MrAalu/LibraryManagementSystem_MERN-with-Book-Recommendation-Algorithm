const { StatusCodes } = require('http-status-codes')
// const dataModel = require('../dataSampleExtra/bookdataSample')
const BookList = require('../models/bookScheme')

const getFilterData = async (req, res) => {
  const { title, available, category, author, language } = req.query
  const queryObject = {}

  if (title) {
    queryObject.title = { $regex: title, $options: 'i' }
  }

  if (available) {
    queryObject.available = available === 'true' ? true : false
  }

  if (category) {
    const categories = category.split(',').map((cat) => new RegExp(cat, 'i'))
    queryObject.category = { $in: categories }
  }

  if (author) {
    queryObject.author = { $regex: author, $options: 'i' }
  }

  if (language) {
    queryObject.language = { $regex: language, $options: 'i' }
  }

  const result = await BookList.find(queryObject).limit(10)

  res.status(StatusCodes.OK).json({ total: result.length, data: result })
}

module.exports = { getFilterData }

//filtering books based on  : title, available, category, author , language ,
