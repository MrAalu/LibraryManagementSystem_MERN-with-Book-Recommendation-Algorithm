import React from 'react'

const CategoryButtons = (props) => {
  const { filterFunction, categories } = props
  return (
    <div>
      {categories.map((map_para) => {
        return (
          <button onClick={() => filterFunction(map_para)}>{map_para}</button>
        )
      })}
    </div>
  )
}

export default CategoryButtons
