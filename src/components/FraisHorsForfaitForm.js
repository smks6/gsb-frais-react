import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/FraisForm.css";
import { API_URL } from "../services/authService";

function FraisHorsForfaitForm({ idFrais, fraisHF }) {
  const isEdit = !!fraisHF;
  const [date, setDate] = useState(fraisHF?.date_fraishorsforfait || "");
  const [libelle, setLibelle] = useState(fraisHF?.lib_fraishorsforfait || "");
  const [montant, setMontant] = useState(fraisHF?.montant_fraishorsforfait || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!date || !libelle || !montant) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const fraisHFData = { date_fraishorsforfait: date, lib_fraishorsforfait: libelle, montant_fraishorsforfait: montant, id_frais: idFrais };

      if (isEdit) {
        await axios.put(`${API_URL}fraisHF/${fraisHF.id_fraishorsforfait}`, fraisHFData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${API_URL}fraisHF/add`, fraisHFData, { headers: { Authorization: `Bearer ${token}` } });
      }

      navigate(`/frais/${idFrais}/hors-forfait`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="frais-form-container">
      <h2>{isEdit ? "Modifier un frais hors forfait" : "Ajouter un frais hors forfait"}</h2>
      {error && <div className="error-message">{error}</div>}

      <form className="frais-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date :</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Libellé :</label>
          <input type="text" value={libelle} onChange={(e) => setLibelle(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Montant (€) :</label>
          <input type="number" step="0.01" min="0" value={montant} onChange={(e) => setMontant(e.target.value)} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : isEdit ? "Modifier" : "Ajouter"}
        </button>
        <button onClick={() => navigate(`/frais/modifier/${idFrais}`)}>
        Retour
      </button>
      </form>
    </div>
  );
}

export default FraisHorsForfaitForm;
