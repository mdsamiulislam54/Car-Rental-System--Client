import React, { useContext } from 'react'
import UserContext from '../../ContextApi/UserContext/UserContext'

const UseAuth = () => {
  const user = useContext(UserContext)
  return (
    user
  )
}

export default UseAuth