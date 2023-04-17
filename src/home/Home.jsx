import React from 'react'

// Importing CSS
import './home.css'

// Importing Data
import { BooksDatabase } from '../myDatabase/Data'

const Home = () => {
  return (
    <div className='home-main-div'>
      {/* <BannerHome></BannerHome> */}

      {/* Recommendation Books Here */}
      {BooksDatabase.map((map_paramter) => {
        return (
          <RecommendedBooks
            key={map_paramter.id}
            {...map_paramter}
          ></RecommendedBooks>
        )
      })}

      {/* <BrowseByCategory></BrowseByCategory>

      <NewlyAddedBooks></NewlyAddedBooks>

      <SubscribeNewsletters></SubscribeNewsletters> */}
    </div>
  )
}

// <------------------------------------------------------------------------------------------>

// Banner Div Here
const BannerHome = () => {
  return (
    <div className='home-banner-div'>
      <img
        src='https://i.ibb.co/kGdnKt5/Into-the-wild-reading-book-CROPPPED.jpg'
        alt='bannerimagehere'
      />
    </div>
  )
}

// Recommended Books Div here
const RecommendedBooks = (props) => {
  const { name, img, description, author } = props
  return (
    <div className='home-recommended-books-div'>
      <img src={img} alt='book image' />
      <h2>{name}</h2>
      <h3>{author}</h3>
      <p>{description}</p>
    </div>
  )
}

// Browse by Categories/Filter
const BrowseByCategory = () => {
  return (
    <div className='home-browse-category home-browse-genres browse-books'>
      <h2>Browse Books</h2>
    </div>
  )
}

// New Added Books / Trending Books
const NewlyAddedBooks = () => {
  return (
    <div className='home-trending-books home-mostissued-books'>
      <h2>Trending Books</h2>
    </div>
  )
}

// Subscribe to our Newsletters
const SubscribeNewsletters = () => {
  return (
    <div className='subscribe-newsletters'>
      <h3>Subscribe to our Newsletters</h3>
    </div>
  )
}

export default Home
