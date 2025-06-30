import React from 'react'
import { Outlet } from 'react-router'

const PlainLayOut = () => {
  return (
    <div>
       <Outlet />
    </div>
  )
}

export default PlainLayOut