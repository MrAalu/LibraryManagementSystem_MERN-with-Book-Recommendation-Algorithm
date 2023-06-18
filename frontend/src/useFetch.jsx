import axios from 'axios'
import { useEffect, useState } from 'react'
import { backend_server } from './main'

const useFetch = (API_URL) => {
  const [loading, setLoading] = useState(true)
  const [fetched_data, setFetched_Data] = useState([])

  const [imagePath, setImagePath] = useState('')
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL)

      setFetched_Data(response.data)
      setLoading(false)

      // http://localhost:5000/uploads/02e2af9df9c9a02234688a77241924f2 CORRECT

      // http://localhost:5000/uploads\bb367469a423603133b0c570eda20730

      // If response ma Image exists then handle it , else default value set or Undefined error aauxa
      if (response.data.data && response.data.data.image) {
        const imagePath = response.data.data.image
        const fullImagePath = `${backend_server}/${imagePath}`
        setImagePath(fullImagePath)
      } else {
        // Set a default or fallback value for imagePath
        setImagePath('default_image_path')
      }

      // Old Code for Image
      // const imagePath = response.data.data.image
      // const fullImagePath = `${backend_server}/${imagePath}`
      // setImagePath(fullImagePath)
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchData()
  }, [API_URL])

  return { fetched_data, loading, imagePath }
}

export default useFetch
