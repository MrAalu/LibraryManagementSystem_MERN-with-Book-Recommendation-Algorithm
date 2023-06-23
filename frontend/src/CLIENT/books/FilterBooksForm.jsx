import React, { useState, useEffect } from 'react'
import { backend_server } from '../../main'
import axios from 'axios'

import './filterbooksform.css'

const FilterBooksForm = ({ setBookData, setSearchResult, setFilterActive }) => {
  const API_URL_FILTER = `${backend_server}/api/v1/filter`
  const API_ALLBOOKS_URL = `${backend_server}/api/v1/books`
  const empty_field = {
    title: '',
    category: '',
    author: '',
    language: '',
  }

  const [filterFields, setFilterFields] = useState(empty_field) //Filter FORM Fields Data
  const [categories, setCategories] = useState([]) //all books CATEGORIES
  const [author, setAuthor] = useState([])
  const [language, setLanguage] = useState([])

  // Form Submit handle (FILTER data Fetched)
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // Checking if user falsly hit search without making any changes
    // this fixes -> empty fields search means fetching all data which we dont want
    if (JSON.stringify(filterFields) === JSON.stringify(empty_field)) {
      return setFilterActive(false)
    }
    setFilterActive(true)

    const { title, category, author, language } = filterFields
    try {
      const response = await axios.get(API_URL_FILTER, {
        params: {
          title,
          category,
          author,
          language,
        },
      })

      let totalHits = response.data.total
      // console.log(totalHits)
      if (totalHits == 0) {
        setSearchResult(false)
      }

      setBookData(response.data.data)
      // console.log(filterFields)
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }

  // FORM INPUT FIELDS On Change Handlers
  const handleSearchTitleOnChange = (e) => {
    const { name, value } = e.target
    setFilterFields({ ...filterFields, [name]: value })
  }
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value
    setFilterFields({ ...filterFields, category: selectedCategory })
  }
  const handleAuthorChange = (e) => {
    const selectedAuthor = e.target.value
    setFilterFields({ ...filterFields, author: selectedAuthor })
  }
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value
    setFilterFields({ ...filterFields, language: selectedLanguage })
  }

  // Fetch ALL  Book Categories / Author / Language
  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(API_ALLBOOKS_URL)

      const bookCategories = [
        ...new Set(
          response.data.data.map((category_para) => {
            return category_para.category
          })
        ),
      ]

      const bookAuthor = [
        ...new Set(
          response.data.data.map((author_para) => {
            return author_para.author
          })
        ),
      ]

      const bookLanguage = [
        ...new Set(
          response.data.data.map((language_para) => {
            return language_para.language
          })
        ),
      ]

      // console.log(bookCategories)
      // console.log(bookAuthor)
      // console.log(bookLanguage)

      setCategories(bookCategories)
      setAuthor(bookAuthor)
      setLanguage(bookLanguage)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchAllCategories()
  }, [])

  // Clears the FORM value and Filter
  const handleClearFilter = () => {
    setFilterFields(empty_field)
    setCategories([])
    setAuthor([])
    setLanguage([])

    // After clearing all FORM Field , we have to refetch all Categories,Author's and Language's
    fetchAllCategories()
  }

  return (
    <div className='container '>
      <div className='row my-3 justify-content-center'>
        <div className='col-md-8'>
          <form method='get' className='form-inline d-flex'>
            {/* Search Filter */}
            <div className='form-group mx-1 my-1  col-xl-4'>
              <input
                type='text'
                className='form-control mx-1'
                autoComplete='off'
                placeholder='Search by title . . .'
                name='title'
                value={filterFields.title}
                onChange={handleSearchTitleOnChange}
              />
            </div>

            {/* Category Filter */}
            <div className='form-group mx-1 my-1 col-xl-2'>
              <select
                className='form-control mx-1'
                defaultValue=''
                onChange={handleCategoryChange}
              >
                <option key='' value=''>
                  Categories
                </option>
                {categories.map((books_category) => {
                  return (
                    <option key={books_category} value={books_category}>
                      {books_category}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Author Filter */}
            <div className='form-group mx-1 my-1 col-xl-2'>
              <select
                className='form-control mx-1'
                defaultValue=''
                onChange={handleAuthorChange}
              >
                <option key='' value=''>
                  Author
                </option>
                {author.map((books_author) => {
                  return (
                    <option key={books_author} value={books_author}>
                      {books_author}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Language Filter */}
            <div className='form-group mx-1 my-1 col-xl-2'>
              <select
                className='form-control mx-1'
                defaultValue='all'
                onChange={handleLanguageChange}
              >
                <option key='' value=''>
                  Language
                </option>
                {language.map((books_language) => {
                  return (
                    <option key={books_language} value={books_language}>
                      {books_language.toUpperCase()}
                    </option>
                  )
                })}
              </select>
            </div>

            <div
              className='col-xl-2 d-flex text-center '
              style={{ width: 'fit-content' }}
            >
              <button
                type='submit'
                className='btn btn-success mx-1 my-1 '
                onClick={handleFormSubmit}
              >
                Search
              </button>
              <button
                type='button'
                className='btn btn-danger mx-1 my-1'
                onClick={handleClearFilter}
              >
                Clear Filter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FilterBooksForm
