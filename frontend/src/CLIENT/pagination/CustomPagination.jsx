import React, { useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'

const CustomPagination = () => {
  const [activePage, setActivePage] = useState(1)

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber)
    // base on total no of fetch data, 8each garera total page count nikalxu
    // ani dynamic banauxu each click
  }

  return (
    <Pagination>
      <Pagination.Prev
        disabled={activePage === 1}
        // onClick={() => handlePageClick(activePage - 1)}
      />
      <Pagination.Item
        active={activePage === 1}
        // onClick={() => handlePageClick(1)}
      >
        1
      </Pagination.Item>
      <Pagination.Item
        active={activePage === 2}
        // onClick={() => handlePageClick(2)}
      >
        2
      </Pagination.Item>

      <Pagination.Next
      // onClick={() => handlePageClick(activePage + 1)}
      />
    </Pagination>
  )
}

export default CustomPagination
