import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const value = { isLoggedIn, setIsLoggedIn };

  async function getLoggedIn() {
    let isLoggedIn = await axios.get(
      "http://localhost:5000/api/auth/is_logged_in"
    );
    setIsLoggedIn(isLoggedIn.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
