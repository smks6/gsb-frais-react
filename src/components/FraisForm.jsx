import { useState, useEffect } from "react";
import "../style/FraisForm.css";
import { API_URL, getCurrentUser } from "../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function FraisForm({ frais }) {
  const [idFrais, setIdFrais] = useState("");
  const [anneeMois, setAnneeMois] = useState("");
  const [nbJustificatifs, setNbJustificatifs] = useState("");
  const [montant, setMontant] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (frais) {
      setIdFrais(frais.id_frais);
      setMontant(frais.montantvalide || "");
      setAnneeMois(frais.anneemois || "");
      setNbJustificatifs(frais.nbjustificatifs || "");
    }
  }, [frais]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!anneeMois || !nbJustificatifs || !montant) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant");

      const fraisData = {
        anneemois: anneeMois,
        nbjustificatifs: parseInt(nbJustificatifs, 10),
        montantvalide: parseFloat(montant),
        id_visiteur: getCurrentUser()["id_visiteur"],
      };

      let response;
      if (frais) {
        fraisData.id_frais = idFrais;
        response = await axios.put(`${API_URL}frais/modifier/${idFrais}`, fraisData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        response = await axios.post(`${API_URL}frais/ajout`, fraisData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      console.log(response);
      navigate("/dashboard");

    } catch (err) {
      console.error("Erreur :", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Erreur lors de l'enregistrement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="frais-form-container">
      <h2>{frais ? "Modifier le frais" : "Saisir un frais"}</h2>

      {error && <div className="error-message">{error}</div>}

      <form className="frais-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Année-Mois :</label>
          <input
            type="text"
            placeholder="Ex : 202310"
            value={anneeMois}
            onChange={(e) => setAnneeMois(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Nombre de justificatifs :</label>
          <input
            type="number"
            min="0"
            value={nbJustificatifs}
            onChange={(e) => setNbJustificatifs(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Montant (en €) :</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </div>
        <Link
          className="frais-hors-forfait-link"
          to={`/frais/${idFrais}/hors-forfait`}
        >
          Frais hors forfait
        </Link>
        <button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : frais ? "Modifier" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default FraisForm;
