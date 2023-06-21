import axios from 'axios'
import { backend_server } from '../../main'
import { useLoginState } from '../../LoginState'
import toast from 'react-hot-toast'

const RequestBook = () => {
  const Request_API_URL = `${backend_server}/api/v1/requestBooks`

  const userLoginState = useLoginState()

  const request_Book = async (book_id) => {
    if (userLoginState.userLogState === null) {
      console.log('Not Logged in ')
      toast.error('User not Logged in')
    } else {
      try {
        const response = await axios.post(Request_API_URL, {
          bookId: book_id,
        })
        console.log(response)
        toast.success('Book Requested successfully')
      } catch (error) {
        console.log(error.response)
        const message = error.response.data.message
        toast.error(message)
      }
    }
  }
  return { request_Book }
}

export default RequestBook
