import { Navigate } from 'react-router-dom'
import React from 'react'
import auth from './authHelper'

type TProps = {
  children: React.ReactNode
}

function PrivateRoute({ children }: TProps) {
  return auth.isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate
      to={{
        pathname: '/signin'
      }}
    />
  )
}

export default PrivateRoute
