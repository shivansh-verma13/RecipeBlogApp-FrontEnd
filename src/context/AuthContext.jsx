import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  registerUser,
  loginUser,
  userLogout,
  checkAuthStatus,
} from "../helpers/api-communicators.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({
    name: "",
    tagline: "",
  });
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUserId(data.userID);
        setUser({ name: data.name, tagline: data.tagline });
        setLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (userName, password) => {
    const data = await loginUser(userName, password);
    if (data) {
      setUserId(data.userID);
      setUser({ name: data.name, tagline: data.tagline });
      setLoggedIn(true);
    }
  };

  const register = async (userName, password, name, tagline) => {
    const data = await registerUser(userName, password, name, tagline);
    if (data) {
      setUserId(data.userID);
      setUser({ name: data.name, tagline: data.tagline });
      setLoggedIn(true);
    }
  };

  const logout = async () => {
    await userLogout();
    setUserId(null);
    setUser({
      name: "",
      tagline: "",
    });
    setLoggedIn(false);
    window.location.reload();
  };

  const value = { userId, user, isLoggedIn, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
