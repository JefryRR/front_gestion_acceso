import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [user, setUser] = useState(null);
  const [permisos, setPermisos] = useState([]);

  const loginUser = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser, user, permisos, setUser, setPermisos }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}