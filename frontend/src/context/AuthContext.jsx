import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assumes you are using React Router
import { jwtDecode } from 'jwt-decode'; // Install this library for decoding JWT tokens

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();
        
        if (isTokenExpired) {
          handleLogout();
          navigate('/login'); // Redirect to the login page
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        handleLogout();
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
