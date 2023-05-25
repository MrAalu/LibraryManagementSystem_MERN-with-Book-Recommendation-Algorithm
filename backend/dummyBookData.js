const dummyBookData = [
  {
    title: 'TitleOne',
    image: 'https://picsum.photos/200',
    author: 'AuthorAmit',
    description: 'Very good book,must read',
    category: 'SPIRITUAL',
    available: true,
  },
  {
    title: 'TitleTwo',
    image: 'https://picsum.photos/200',
    author: 'AuthorAmit',
    description: 'Very good book,must read',
    category: 'SPIRITUAL',
    available: true,
  },
  {
    title: 'TitleThree',
    image: 'https://picsum.photos/200',
    author: 'AuthorAmit',
    description: 'Very good book,must read',
    category: 'SPIRITUAL',
    available: true,
  },
  {
    title: 'TitleFour',
    image: 'https://picsum.photos/200',
    author: 'AuthorAmit',
    description: 'Very good book,must read',
    category: 'SPIRITUAL',
    available: true,
  },
  {
    title: 'TitleFive',
    image: 'https://picsum.photos/200',
    author: 'AuthorAmit',
    description: 'Very good book,must read',
    category: 'SPIRITUAL',
    available: true,
  },
]

// module.exports = dummyBookData

const dataModel = require('./models/bookScheme')
require('dotenv').config()
const { ConnectDatabase } = require('./database/databaseConnector')

const populateData = async () => {
  try {
    await ConnectDatabase(process.env.CONNECTION_URL)
    console.log('Connect Success')
    await dataModel.deleteMany()
    console.log('Collection Emptied')
    await dataModel.create(dummyBookData)
    console.log('Success')
    process.exit(0)
  } catch (error) {
    console.log('Error importing data')
  }
}

populateData()
