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

// Parse Form data in JSON Format
app.use(express.json())
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
