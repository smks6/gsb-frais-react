import React, { useState, useEffect } from "react";
import fraisData from "../data/frais.json";
import "../style/FraisTable.css";

export default function FraisTable() {
  const [fraisList, setFrais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  const filteredFrais = fraisList.filter(
    (f) =>
      f.anneemois.includes(searchTerm) ||
      f.id_visiteur.toString().includes(searchTerm)
  );

  useEffect(() => {
    setTimeout(() => {
      setFrais(fraisData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div><b>Chargement des frais...</b></div>;

  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>
      <input
        type="text"
        placeholder="Rechercher par annee-mois, ID visiteur ou montant..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Nb justificatifs</th>
            <th>Date modification</th>
            <th>Montant validé</th>
          </tr>
        </thead>
        <tbody>
          {filteredFrais.map((f) => (
            <tr key={f.id_frais}>
              <td>{f.id_frais}</td>
              <td>{f.id_etat}</td>
              <td>{f.anneemois}</td>
              <td>{f.id_visiteur}</td>
              <td>{f.nbjustificatifs}</td>
              <td>{f.datemodification}</td>
              <td>{f.montantvalide ?? "€"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
