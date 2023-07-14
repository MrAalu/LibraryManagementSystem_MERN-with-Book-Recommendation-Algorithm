const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('express-async-errors')
global.StatusCodes = require('http-status-codes').StatusCodes

const { ConnectDatabase } = require('./database/databaseConnector')

const booksRouter = require('./routes/bookRoutes')
const booksRouterLimitSkip = require('./routes/bookRoutesLimitSkip')
const booksRouterRecentBooks = require('./routes/booksRoutesRecentBooks')
const booksRouterFeaturedBooks = require('./routes/booksRoutesFeatured')
const requestBookRouter = require('./routes/requestBooksRoute')
const popularBooksRouter = require('./routes/popularBooksRoutes')

const userRouter = require('./routes/usersRoute')

const CheckBookReturnRouter = require('./routes/checkBookReturn')

const signUpRouter = require('./routes/signUpRoute')
const loginRouter = require('./routes/loginRoutes')
const logoutRouter = require('./routes/logoutRoute')
const forgotpasswordRouter = require('./routes/forgotpassword')

const filterRouter = require('./routes/filterRoutes')

const CustomError = require('./errorHandler/CustomError')
const PageNotFound = require('./errorHandler/PageNotFound')

// Allow CORS Policy
// app.use(cors())

// For recieiving httpOnly cookies
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

app.use(cookieParser())

// Parse Form data in JSON Format
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// making uploads folder globally accessable through static routing
const path = require('path')
// const { cookie } = require('express/lib/response')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Middlewares
const verifyToken = require('./middleware/verifyToken')

// ROUTES
app.use('/api/v1/signup', signUpRouter)
app.use('/api/v1/login', loginRouter)

app.use('/api/v1/logout', verifyToken, logoutRouter)
app.use('/api/v1/forgotpassword', forgotpasswordRouter)

// Filter Books
app.use('/api/v1/filter', filterRouter)

// ALL BOOKS CRUD (Dynamic Middleware Setup on API Endpoints)
app.use('/api/v1/books', booksRouter)

// Limit() and Skip() & Pagination
app.use('/api/v1/book', booksRouterLimitSkip)

app.use('/api/v1/recentBooks', booksRouterRecentBooks)
app.use('/api/v1/featuredBooks', booksRouterFeaturedBooks)
app.use('/api/v1/requestBooks', verifyToken, requestBookRouter)
app.use('/api/v1/popularBooks', popularBooksRouter)

// User Routes
app.use('/api/v1/users', verifyToken, userRouter)

// handles if book not returned then automate CHARGES FINE
app.use('/api/v1/checkbookreturn', CheckBookReturnRouter)

// Fetch RECOMMENDED books
const recommendedBooksRouter = require('./routes/recommendBooksRouter')
app.use('/api/v1/recommendedBooks', verifyToken, recommendedBooksRouter)

//---------------- RECOMMENDATION ALGO TESTING --------------------------
const { algoTest } = require('./controller/bookRecommendationAlgorithm')
app.get('/api/algotest', algoTest)

app.use(CustomError)
app.use(PageNotFound)

// Server
const port = process.env.CONNECTION_PORT || 3000
const InitiateServer = async () => {
  try {
    await ConnectDatabase(process.env.CONNECTION_URL)
    console.log('Connected to Database Successfully')
    app.listen(port, () =>
      console.log(
        `server started at port ${port}.......................................................`
      )
    )
  } catch (error) {
    console.log('ERROR IN SERVER')
  }
}

InitiateServer()
