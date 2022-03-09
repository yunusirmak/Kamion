import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleLogin = (user) => {
    console.log(user);
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  const login = async (username, password) => {
    const response = await axios.post(
      `${baseURL}/api/shipper/login`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
    handleLogin(response.data.data);
  };

  const register = async (
    username,
    password,
    firstName,
    lastName,
    phone,
    email
  ) => {
    const response = await axios.post(
      `${baseURL}/api/shipper/register`,
      {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
      },
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
    handleLogin(response.data.data);
  };

  const values = {
    user,
    isAuthenticated,
    login,
    register,
    handleLogin,
    handleLogout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
