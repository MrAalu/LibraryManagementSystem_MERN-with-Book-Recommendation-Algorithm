// This controller only updates book image ,
// replaces old image location with new image location and deletes old image file from 'uploads' folder

const BookModel = require('../models/bookScheme')
const fs = require('fs')
const path = require('path')

const updateBookImage = async (req, res) => {
  const { id: bookID } = req.params //book ID
  const new_imageFileLocation = req.file.path

  const getBookDetails = await BookModel.findById(bookID)

  if (!getBookDetails) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    })
  }
  const old_imageFileLocation = await getBookDetails.image

  await BookModel.findByIdAndUpdate(
    { _id: bookID },
    { image: new_imageFileLocation },
    {
      new: true,
      runValidators: true,
    }
  )

  // Delete the image file from the uploads folder
  const imagePath = path.join(__dirname, '..', old_imageFileLocation)
  // console.log('Deleted Image FILE PATH : ', imagePath)
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(`Error deleting image file: ${err}`)
    }
  })

  res.status(StatusCodes.OK).json({ success: true, data: getBookDetails })
}

module.exports = updateBookImage
