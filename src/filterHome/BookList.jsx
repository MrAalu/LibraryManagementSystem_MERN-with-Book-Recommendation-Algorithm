import React from 'react'

const BookList = (props) => {
  const { books } = props
  return (
    <div className='booklist'>
      {books.map((map_para) => {
        const { name, category } = map_para
        return (
          <h3>
            {name}- {category}
          </h3>
        )
      })}
    </div>
  )
}

export default BookList
