import { useNavigate } from "react-router-dom";

function FraisHorsForfaitTable({ fraisHorsForfaitList, total, idFrais }) {
  const navigate = useNavigate();

  return (
    <div>
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
          <tr>
            <td colSpan="3"><b>Total</b></td>
            <td><b>{total} €</b></td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => navigate(`/frais/modifier/${idFrais}`)}>
        Retour
      </button>
    </div>
  );
}

export default FraisHorsForfaitTable;
