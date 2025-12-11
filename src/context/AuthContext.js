import { createContext, useContext, useEffect, useState } from "react";
import { signIn, logout, getCurrentUser, getAuthToken } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = async (login, password) => {
    const data = await signIn(login, password);
    setUser(data.visiteur);
    setToken(data.access_token);
    return data;
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    setToken(null);
  };

useEffect(() => {
  const user = getCurrentUser(); 
  const token = getAuthToken();
  if (user && token) {
    setUser(user);
    setToken(token);
  }
  setLoading(false);
}, []);

  return (
    <AuthContext.Provider value={{ user, token,loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
