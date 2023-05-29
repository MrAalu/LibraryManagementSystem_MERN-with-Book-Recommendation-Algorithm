import React from 'react'
import { Row, Col } from 'react-bootstrap'

const FilterBooks = () => {
  return (
    <div
      className='container'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <form
        className='book-filter-form '
        style={{ alignItems: 'center', display: 'flex' }}
      >
        <TitleFilter></TitleFilter>

        <CategoryFilter></CategoryFilter>

        <LanguageFilter></LanguageFilter>

        <AuthorFilter></AuthorFilter>

        <AvailableFilter></AvailableFilter>

        <ApplyClearFilter></ApplyClearFilter>
      </form> */}

      <form>
        <Row className='align-items-center'>
          <Col xs={12} lg={2} xl={3}>
            <TitleFilter></TitleFilter>
          </Col>
          <Col xs={12} lg={2}>
            <CategoryFilter></CategoryFilter>
          </Col>
          <Col xs={12} lg={2}>
            <LanguageFilter></LanguageFilter>
          </Col>
          <Col xs={12} lg={2}>
            <AuthorFilter></AuthorFilter>
          </Col>
          <Col xs={12} lg={2}>
            <AvailableFilter></AvailableFilter>
          </Col>
          <Col xs={12} lg={2} xl={1}>
            <ApplyClearFilter></ApplyClearFilter>
          </Col>
        </Row>
      </form>
    </div>
  )
}

/* Search by Title Filter */
const TitleFilter = () => {
  return (
    <div className='form-group mx-1 my-2'>
      <input
        type='text'
        className='form-control'
        placeholder='Search by title . . .'
      />
    </div>
  )
}

/* Category Filter */
const CategoryFilter = () => {
  return (
    <div className='form-group mx-1 my-2'>
      <select className='form-control' defaultValue='all'>
        <option value='all' disabled hidden>
          Categories
        </option>
        <option value='all'>All Categories</option>
        <option value='fiction'>Fiction</option>
        <option value='non-fiction'>Non-Fiction</option>
        <option value='mystery'>Mystery</option>
      </select>
    </div>
  )
}

/* Language Filter */
const LanguageFilter = () => {
  return (
    <div className='form-group mx-1 my-2'>
      <select className='form-control' defaultValue='all'>
        <option value='all' disabled hidden>
          Language
        </option>
        <option value='all'>All</option>
        <option value='english'>English</option>
        <option value='nepali'>Nepali</option>
      </select>
    </div>
  )
}

/* Author Filter */
const AuthorFilter = () => {
  return (
    <div className='form-group mx-1 my-2'>
      <select className='form-control' defaultValue='all'>
        <option value='all' disabled hidden>
          Author
        </option>
        <option value='all'>Any</option>
        <option value='english'>Osho</option>
        <option value='nepali'>Sadhguru</option>
      </select>
    </div>
  )
}

/* Available Filter (stock/outofStock) */
const AvailableFilter = () => {
  return (
    <div className='form-group mx-1 my-2'>
      <div className='form-check'>
        <label htmlFor='showAvailable' className='form-check-label'>
          Available
        </label>
        <input
          type='checkbox'
          className='form-check-input'
          id='showAvailable'
          defaultChecked
        />
      </div>
    </div>
  )
}

/* Apply / Clear FILTER properties */
const ApplyClearFilter = () => {
  return (
    <div className='form-group justify-content-center d-flex mx-1 my-2 '>
      <button type='button' className='btn btn-success me-2'>
        Apply
      </button>
      <button type='button' className='btn btn-danger me-2'>
        Clear
      </button>
    </div>
  )
}

export default FilterBooks
