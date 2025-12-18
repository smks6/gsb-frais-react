import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";
import { useAuth } from "../context/AuthContext";

function FraisHorsForfaitAdd() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Ajout d'un frais hors forfait</h1>

            {user && (
                <p>
                    Ajouter un frais hors forfait pour <strong>{user.nom_visiteur}</strong> !
                </p>
            )}
            <FraisHorsForfaitForm user={user} />
        </div>
    );
}
export default FraisHorsForfaitAdd;
