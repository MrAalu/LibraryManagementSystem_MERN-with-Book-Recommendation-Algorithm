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

    // Page buttons
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      paginationButtons.push(
        <Pagination.Item
          key={pageNumber}
          active={activePage === pageNumber}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
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
