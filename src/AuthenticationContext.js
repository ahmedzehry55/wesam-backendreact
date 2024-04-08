import React, { createContext, useState, useContext } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Perform login logic, set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform logout logic, set isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};