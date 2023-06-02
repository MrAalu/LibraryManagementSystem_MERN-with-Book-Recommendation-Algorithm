const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
require('express-async-errors')
const { ConnectDatabase } = require('./database/databaseConnector')
const { booksRouter } = require('./routes/bookRoutes')
const signUpRouter = require('./routes/signUpRoute')
const loginRouter = require('./routes/loginRoutes')
const filterRouter = require('./routes/filterRoutes')
const CustomError = require('./errorHandler/CustomError')
const PageNotFound = require('./errorHandler/PageNotFound')

// Allow CORS Policy
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ---------------------------MULTER---CREATING----NEW----BOOK-------------------
// const ImageModel = require('./model')

// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

// app.post('/api/v1/multer', upload.single('image'), async (req, res) => {
//   const image = req.file.path
//   const { title, description, language, author, category } = req.body

//   let featured
//   if (req.body.featured === 'true') {
//     featured = true
//   } else {
//     featured = false
//   }

//   let available
//   if (req.body.available === 'true') {
//     available = true
//   } else {
//     available = false
//   }

//   // console.log(req.body)
//   // console.log(req.file.path)
//   const result = await ImageModel.create({
//     title,
//     description,
//     language,
//     author,
//     category,
//     featured,
//     available,
//     image,
//   })

//   res.status(200).json({ data: result })
// })

// making uploads folder globally accessable through static routing
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ---------------------------MULTER ENDS------------------------------

// Parse Form data in JSON Format
app.use('/api/v1/books', booksRouter)

app.use('/api/v1/signup', signUpRouter)
app.use('/api/v1/login', loginRouter)

app.use('/api/v1/filter', filterRouter)

app.use(CustomError)
app.use(PageNotFound)

const port = process.env.CONNECTION_PORT || 3000
const InitiateServer = async () => {
  try {
    await ConnectDatabase(process.env.CONNECTION_URL)
    console.log('Connected to Database Successfully')
    app.listen(port, () => console.log(`server started at port ${port}...`))
  } catch (error) {
    console.log('ERROR IN SERVER')
  }
}

InitiateServer()
