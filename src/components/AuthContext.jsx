import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null)

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const adminLogin = (adminData) => {
    setAdminUser(adminData)
  }

  const adminLogout = () => {
    setAdminUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, adminUser, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
