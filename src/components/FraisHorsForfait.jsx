import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../style/FraisHorsForfait.css";
import FraisHorsForfaitTable from "./FraisHorsForfaitTable";

export default function FraisHorsForfait() {

  const { id } = useParams();  // récupère l'id du frais
  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchFraisHorsForfaitList = async () => {
      try {
        const response = await axios.get(
          `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/liste/${id}`
        );

        setFraisHorsForfaitList(response.data);

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
      />
    </div>
  );
}
