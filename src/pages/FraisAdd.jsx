import { useAuth } from "../context/AuthContext";
import FraisForm from "../components/FraisForm";

function FraisAdd() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Ajout d'un frais</h1>

            {user && (
                <p>
                    Ajouter un frais pour <strong>{user.nom_visiteur}</strong> !
                </p>
            )}
            <FraisForm user={user} />
        </div>
    );
}
export default FraisAdd;
