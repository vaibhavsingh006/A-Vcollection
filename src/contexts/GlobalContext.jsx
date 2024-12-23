// context/GlobalContext.js
import React, { createContext, useState, useContext } from 'react';

// Step 1: Create the Context
const GlobalContext = createContext();

// Step 2: Create a Provider component to manage global state
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState("Aditya");
  const [theme, setTheme] = useState('light');

  // Function to change theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Function to log in a user
  const login = (userInfo) => {
    setUser(userInfo);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
  };

  // Value to be shared across components
  const value = {
    user,
    theme,
    login,
    logout,
    toggleTheme,
  };

  return (
    // Step 3: Provide context value to children components
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// Step 4: Create a custom hook to access context value easily
export const useGlobalContext = () => useContext(GlobalContext);