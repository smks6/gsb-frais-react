//import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const {loading } = useAuth();
  if (loading){
    return <div>Chargement ...</div>
  }return children;
}
