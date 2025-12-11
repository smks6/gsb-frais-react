import { useAuth } from "../context/AuthContext";
import FraisTable from "../components/FraisTable";

function Dashboard() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Tableau de bord</h1>

            {user && (
                <p>Bienvenue <strong>{user.nom_visiteur}</strong> !</p>
            )}
            <FraisTable/>
        </div>
    );
}

export default Dashboard;
