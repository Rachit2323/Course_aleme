import React from 'react'
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = ({isAuth,children}) => {
    if (!isAuth) {
        return <Navigate to={"/signin"} />;
      }
  return <Outlet/>
}

export default PrivateRoute
