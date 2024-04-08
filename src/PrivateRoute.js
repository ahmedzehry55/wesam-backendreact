import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from './AuthenticationContext';
const PrivateRoute = ({component: Component, ...rest}) => {
    return (
      <Route
        {...rest}
        element={
          auth ? <Component /> : <Navigate to="/login" />  
        }
      />
    )
  }
export default PrivateRoute;