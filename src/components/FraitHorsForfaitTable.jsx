import React from "react";

export default function FraisHorsForfaitTable({ id_frais, fraisHorsForfaitList }) {
  return (
    <table className="frais-hf-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Libellé</th>
          <th>Montant</th>
        </tr>
      </thead>

      <tbody>
        {fraisHorsForfaitList.length === 0 ? (
          <tr>
            <td colSpan="4">Aucun frais hors forfait</td>
          </tr>
        ) : (
          fraisHorsForfaitList.map((frais) => (
            <tr key={frais.id_fraishorsforfait}>
              <td>{frais.id_fraishorsforfait}</td>
              <td>{frais.date_fraishorsforfait}</td>
              <td>{frais.lib_fraishorsforfait}</td>
              <td>{frais.montant_fraishorsforfait} €</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
