import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../style/FraisHorsForfait.css";
import FraisHorsForfaitTable from "./FraisHorsForfaitTable";

function FraisHorsForfait() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchFraisHorsForfaitList = async () => {
      try {
        const response = await axios.get(
          `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/liste/${id}`
        );

        setFraisHorsForfaitList(response.data);

        let somme = 0;
        response.data.forEach((fraisHF) => {
          somme += parseFloat(fraisHF.montant_fraishorsforfait);
        });
        setTotal(somme);

      } catch (error) {
        console.error("Erreur lors de la récupération des frais hors forfait :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFraisHorsForfaitList();
  }, [id]);

  if (loading) return <b>Chargement des frais hors forfait...</b>;

  return (
    <div className="frais-hf-container">
      <h2>Frais Hors Forfait du frais n° {id}</h2>

      <FraisHorsForfaitTable
        idFrais={id}
        fraisHorsForfaitList={fraisHorsForfaitList}
        total={total}
      />
      <button
        className="btn-ajout"
        onClick={() => navigate(`/frais-hors-forfait/ajouter/${id}`)}
      >
        Ajouter un frais hors forfait
      </button>
    </div>
  );
}

export default FraisHorsForfait;
