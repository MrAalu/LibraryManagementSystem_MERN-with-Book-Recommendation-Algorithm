const express = require('express')
const app = express()
require('dotenv').config()
const { ConnectDatabase } = require('./database/databaseConnector')
const { booksRouter } = require('./routes/bookRoutes')
const CustomError = require('./errorHandler/CustomError')
const PageNotFound = require('./errorHandler/PageNotFound')

const port = process.env.CONNECTION_PORT || 3000

app.use('/api/v1/books', booksRouter)
app.use(CustomError)
app.use(PageNotFound)

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
