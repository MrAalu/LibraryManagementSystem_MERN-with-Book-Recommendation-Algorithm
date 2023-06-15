import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (API_URL) => {
  const [loading, setLoading] = useState(true)
  const [fetched_data, setFetched_Data] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL)

      setFetched_Data(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchData()
  }, [API_URL])

  return { fetched_data, loading }
}

export default useFetch
