import React from 'react'
import { useLoginState } from '../../LoginState'

const ClientProfile = () => {
  const userLoginState = useLoginState()

  return (
    <div className='container'>
      <h1 className='h1 text-center'>Welcome {userLoginState.userLogState}</h1>
    </div>
  )
}

export default ClientProfile
