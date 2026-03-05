import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // start with null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wrap in a function, then call it
    const initializeAuth = () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (data) => {
    setToken(data.token);
    setUser({ id: data.id, email: data.email });
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const authInfo = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;