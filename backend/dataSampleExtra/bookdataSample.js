const book_data_sample = [
  {
    // ID given by MONGOOSE
    // Date will be generated by dataScheme
    title: `Can't Hurt Me: Master Your Mind and Defy the Odds`,
    image: `https://m.media-amazon.com/images/I/81gTRv2HXrL._AC_UF1000,1000_QL80_.jpg`,
    author: `David Goggins`,
    description: `For David Goggins, childhood was a nightmare -- poverty, prejudice, and physical abuse colored his days and haunted his nights. But through self-discipline, mental toughness, and hard work, Goggins transformed himself from a depressed, overweight young man with no future into a U.S. Armed Forces icon and one of the world's top endurance athletes. The only man in history to complete elite training as a Navy SEAL, Army Ranger, and Air Force Tactical Air Controller, he went on to set records in numerous endurance events, inspiring Outside magazine to name him "The Fittest (Real) Man in America."
`,
    category: ['selfimprovement', 'descipline', 'motivation'],
    available: true,
    featured: true,
    language: `english`,
  },

  {
    // ID given by MONGOOSE
    title: `The Subtle Art of Not Giving a F*ck`,
    image: `https://media.thuprai.com/products/subtle_fuck.jpg`,
    author: `Mark Manson`,
    description: `The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life is a 2016 nonfiction self-help book by American blogger and author Mark Manson.`,
    category: ['selfimprovement'],
    available: false,
    featured: false,
    language: `english`,
  },

  {
    // ID given by MONGOOSE
    title: `The Brothers Karamazov`,
    image: `https://m.media-amazon.com/images/I/71OZJsgZzQL._AC_UF1000,1000_QL80_.jpg`,
    author: `Fyodor Dostoevsky`,
    description: `The Brothers Karamazov, also translated as The Karamazov Brothers, is the last novel by Russian author Fyodor Dostoevsky. Dostoevsky spent nearly two years writing The Brothers Karamazov, which was published as a serial in The Russian Messenger from January 1879 to November 1880.`,
    category: ['Novel', 'Suspense', 'Philosophical', 'fiction'],
    available: true,
    featured: true,
    language: `russian`,
  },
]

const mongoose = require('mongoose')
const dataScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    required: true,
  },
  dataAdded: {
    type: Date,
    default: Date.now(),
  },
})
const dataModel = mongoose.model('sampleData', dataScheme)

require('dotenv').config()
const { ConnectDatabase } = require('../database/databaseConnector')

const Populate_Data = async () => {
  try {
    await ConnectDatabase(process.env.CONNECTION_URL)
    await dataModel.deleteMany()
    await dataModel.create(book_data_sample)
    console.log('Success')
    process.exit(0)
  } catch (error) {
    console.log('Error', error)
  }
}

// Populate_Data()

module.exports = dataModel
