import { createContext, useContext, useState } from "react";
import { signIn } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken]=useState(null);

  const loginUser = async(login, password) => {
    const data=await signIn(login, password);
    setUser(data.visiteur);
    setToken(data.access_token);
    return data;
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
