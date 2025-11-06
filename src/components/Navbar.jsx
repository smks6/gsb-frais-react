import { Link } from "react-router-dom";
import "../style/Navbar.css"; 

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-links">
                    <span className="navbar-gsb">GSB Frais</span>
                    <Link to="/" className="navbar-link">Accueil</Link>
                    <Link to="/dashboard" className="navbar-link">Tableau de bord</Link>
                </div>
                <div className="navbar-auth">
                    <Link to="" className="navbar-link">Déconnexion</Link>
                    <Link to="/login" className="navbar-link">Connexion</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
