
import { useState, createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components

// import {getMe}from "./Services/authApi"
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};