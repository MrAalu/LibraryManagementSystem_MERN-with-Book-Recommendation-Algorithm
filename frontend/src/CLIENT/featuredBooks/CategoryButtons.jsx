import React from 'react'

const CategoryButtons = (props) => {
  const { filterFunction, categories } = props
  return (
    <div>
      {categories.map((map_para, index) => {
        return (
          <button
            key={index}
            className='btn btn-success mx-3 my-1'
            onClick={() => filterFunction(map_para)}
          >
            {map_para}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryButtons
