import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { backend_server } from '../../main'

const CustomPagination = ({ fetchData, filterActive }) => {
  const TotalBooksQty_API = `${backend_server}/api/v1/books`

  const [activePage, setActivePage] = useState(1)

  const [totalPages, setTotalPages] = useState(null)

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber)

    fetchData(pageNumber)
  }

  useEffect(() => {
    const fetchTotalBooksQty = async () => {
      try {
        const response = await axios.get(TotalBooksQty_API)
        const totalHits = response.data.totalHits
        setTotalPages(Math.ceil(totalHits / 8)) // Use Math.ceil to round up to the nearest integer
      } catch (error) {
        console.log(error)
      }
    }

    fetchTotalBooksQty()
  }, [])

  const generatePaginationButtons = () => {
    const paginationButtons = []

    // Previous button
    paginationButtons.push(
      <Pagination.Prev
        key='prev'
        disabled={activePage === 1}
        onClick={() => handlePageClick(activePage - 1)}
      />
    )

    // First page button
    paginationButtons.push(
      <Pagination.Item
        key={1}
        active={activePage === 1}
        onClick={() => handlePageClick(1)}
        className='btn-pagination'
      >
        {1}
      </Pagination.Item>
    )

    const range = 2 // Number of page buttons to display on each side of the active page

    if (activePage - range > 2) {
      paginationButtons.push(
        <Pagination.Ellipsis key='start-ellipsis' disabled />
      )
    }

    for (
      let pageNumber = activePage - range;
      pageNumber <= activePage + range;
      pageNumber++
    ) {
      if (pageNumber > 1 && pageNumber < totalPages) {
        paginationButtons.push(
          <Pagination.Item
            key={pageNumber}
            active={activePage === pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className='btn-pagination'
          >
            {pageNumber}
          </Pagination.Item>
        )
      }
    }

    if (activePage + range < totalPages - 1) {
      paginationButtons.push(
        <Pagination.Ellipsis key='end-ellipsis' disabled />
      )
    }

    // Last page button (if there are more than 1 page)
    if (totalPages > 1) {
      paginationButtons.push(
        <Pagination.Item
          key={totalPages}
          active={activePage === totalPages}
          onClick={() => handlePageClick(totalPages)}
          className='btn-pagination'
        >
          {totalPages}
        </Pagination.Item>
      )
    }

    // Next button
    paginationButtons.push(
      <Pagination.Next
        key='next'
        disabled={activePage === totalPages}
        onClick={() => handlePageClick(activePage + 1)}
      />
    )
    return paginationButtons
  }

  return (
    <div>
      {/* if filterForm is active then display null (no pagination) else display Pagination */}
      {filterActive ? null : (
        <Pagination>{generatePaginationButtons()}</Pagination>
      )}
    </div>
  )
}

export default CustomPagination
