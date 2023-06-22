## app.use() ->

`app.use(express.static('./public'))`  
`app.use(express.urlencoded({ extended: false }))`  
`app.use(express.json())`

## Guide for BACKEND Setup :

1-> Create Server :)

    ROUTES : "Handles all the api routing"

    CONTROLLER : "Handles the Functionality of all the Routes"

    MODEL : Database Collections Structure + Scheme + Data Validation

2-> Setup POSTMAN | Collections && Global Variables

3-> Setup .env | Database `CONNECTION_URL` + Port Settings

4-> Database Connector | Initates Connection with Database using .env `CONNECTION_URL`

5-> Page Not Found 404 Error Handling

6-> Clean BoilerPlate Codes i.e. Controller's Try/Catch Blocks using 'Try/Catch Wrapper' or Package 'express-async-errors'

7-> Custom Error Handler && Handling the thrown error Manually

## API Reference (BOOKS)

#### Get all books

```http
  GET /api/v1/books
```

#### Post book

```http
  POST /api/v1/books
```

#### Get Single book

```http
  GET /api/v1/books/:id
```

#### Update Single book

```http
  PATCH /api/v1/books/:id
```

#### Delete Single book

```http
  DELETE /api/v1/books/:id
```

## Environment Variables (.env)

To run this project, you will need to add the following environment variables to your .env file

`CONNECTION_PORT` -> Server starts at this PORT

`CONNECTION_URL` = MongoDb database Connection URL

`JWT_SECRET` = Json Web Token Sign & Verify

`JWT_LIFE` = JWT Token Expiry Date
