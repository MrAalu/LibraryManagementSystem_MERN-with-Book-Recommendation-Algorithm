const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('express-async-errors')
global.StatusCodes = require('http-status-codes').StatusCodes

const { ConnectDatabase } = require('./database/databaseConnector')
const { booksRouter } = require('./routes/bookRoutes')
const signUpRouter = require('./routes/signUpRoute')
const loginRouter = require('./routes/loginRoutes')
const filterRouter = require('./routes/filterRoutes')
const CustomError = require('./errorHandler/CustomError')
const PageNotFound = require('./errorHandler/PageNotFound')

// Allow CORS Policy
// app.use(cors())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

app.use(cookieParser())

// Parse Form data in JSON Format
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// making uploads folder globally accessable through static routing
const path = require('path')
const { cookie } = require('express/lib/response')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ---------------------------MULTER ENDS------------------------------

app.use('/api/v1/signup', signUpRouter)
app.use('/api/v1/login', loginRouter)

app.use('/api/v1/filter', filterRouter)

app.use('/api/v1/books', booksRouter)

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
