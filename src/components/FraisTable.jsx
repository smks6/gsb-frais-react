import React, { useState, useEffect } from "react";
import fraisData from "../data/frais.json";
import "../style/FraisTable.css";

export default function FraisTable() {
  const [fraisList, setFrais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [minMontant, setMinMontant] = useState("");

  const filteredFrais = fraisList.filter((f) => {
    if (filterNonNull && (f.montantvalide === null || f.montantvalide === undefined)) {
      return false;
    }

    if (
      !(f.anneemois.includes(searchTerm) || f.id_visiteur.toString().includes(searchTerm))
    ) {
      return false;
    }

    if (minMontant && f.montantvalide !== null && f.montantvalide !== undefined) {
      return f.montantvalide >= parseFloat(minMontant);
    }

    return true;
  });

  useEffect(() => {
    setTimeout(() => {
      setFrais(fraisData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div><b>Chargement des frais...</b></div>;

  const rows = [];
  for (let i = 0; i < filteredFrais.length; i++) {
    const f = filteredFrais[i];
    rows.push(
      <tr key={f.id_frais}>
        <td>{f.id_frais}</td>
        <td>{f.id_etat}</td>
        <td>{f.anneemois}</td>
        <td>{f.id_visiteur}</td>
        <td>{f.nbjustificatifs}</td>
        <td>{f.datemodification}</td>
        <td>{f.montantvalide ?? "€"}</td>
      </tr>
    );
  }

  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>

      <div className="controls">
        <div>
          <label>
            <input
              type="checkbox"
              checked={filterNonNull}
              onChange={(e) => setFilterNonNull(e.target.checked)}
            />
            Afficher uniquement les frais validés
          </label>
        </div>

        <div>
          <input
            type="text"
            placeholder="Rechercher par année-mois ou ID visiteur"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label>
            Montant minimum :
            <input
              type="number"
              value={minMontant}
              onChange={(e) => setMinMontant(e.target.value)}
              placeholder="0 €"
            />
          </label>
        </div>
      </div>

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
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
