import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/FraisForm.css";

function FraisHorsForfaitForm({ idFrais }) {
  const [date, setDate] = useState("");
  const [libelle, setLibelle] = useState("");
  const [montant, setMontant] = useState("");
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
      if (!token) throw new Error("Token manquant");

      const fraisHFData = {
        date_fraishorsforfait: date,
        libelle_fraishorsforfait: libelle,
        montant_fraishorsforfait: parseFloat(montant),
        id_frais: idFrais
      };

      await axios.post(
        `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/add`,
        fraisHFData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/frais-hors-forfait/${idFrais}`);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || err.message || "Erreur lors de l'ajout du frais hors forfait"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="frais-form-container">
      <h2>Ajouter un frais hors forfait</h2>

      {error && <div className="error-message">{error}</div>}

      <form className="frais-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date :</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Libellé :</label>
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Montant (€) :</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default FraisHorsForfaitForm;
