import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";
import { API_URL } from "../services/authService";

function FraisHorsForfaitEdit() {
  const { id, idHF } = useParams(); // id = ID du frais, idHF = ID du frais hors forfait
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fraisHF, setFraisHF] = useState(null);

  useEffect(() => {
    const fetchFraisHF = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}fraisHF/${idHF}`, // URL pour récupérer un frais hors forfait
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFraisHF(response.data);
      } catch (err) {
        console.error("Erreur API:", err.response?.data || err.message);
        setError("Impossible de charger le frais hors forfait.");
      } finally {
        setLoading(false);
      }
    };

    fetchFraisHF();
  }, [idHF]);

  if (loading) return <div>Chargement du frais hors forfait...</div>;
  if (error) return <div>{error}</div>;
  if (!fraisHF) return <div>Frais hors forfait non trouvé</div>;

  return <FraisHorsForfaitForm fraisHF={fraisHF} idFrais={id} />;
}

export default FraisHorsForfaitEdit;
