import React from 'react'
import { useLoginState } from '../../LoginState'

const ClientProfile = () => {
  const userLoginState = useLoginState()

  return (
    <div>
      <h1>Welcome {userLoginState.userLogState}</h1>
    </div>
  )
}

export default ClientProfile
