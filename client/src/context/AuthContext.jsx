import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // <-- Add at top

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data if logged in
  const [authToken, setAuthToken] = useState(null); // Stores the JWT token
  const [isLoading, setIsLoading] = useState(true); // To check initial loading from localStorage

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          logout(); // Clear token if expired
        } else {
          setAuthToken(storedToken);
          setUser(storedUser ? JSON.parse(storedUser) : null);
        }
      } catch (e) {
        console.error('Invalid token or user format:', e);
        logout();
      }
    }
    setIsLoading(false);
  }, []);


  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
    setAuthToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext easily
export const useAuth = () => {
  return useContext(AuthContext);
};