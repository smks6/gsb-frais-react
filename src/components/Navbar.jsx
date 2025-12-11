import { Link } from "react-router-dom";
import "../style/Navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">

        <div className="navbar-links">
          <span className="navbar-gsb">GSB Frais</span>
          <Link to="/" className="link">Accueil</Link>
          {user && (
            <Link to="/dashboard" className="link">
              Tableau de bord
            </Link>
          )}
          {user && (
            <Link to="/frais/ajouter" className="link">
              Ajout frais
            </Link>
          )}
        </div>

        <div className="navbar-auth">
          {user ? (
            <button className="link-btn-logout" onClick={logoutUser} type="logout">
              Déconnexion
            </button>
          ) : (
            <Link to="/login" className="link">
              Connexion
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
