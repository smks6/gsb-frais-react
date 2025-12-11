import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FraisForm from "./FraisForm";
import { API_URL } from "../services/authService";

function FraisEdit() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [frais, setFrais] = useState(null);

    useEffect(() => {
        const fetchFrais = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}frais/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFrais(response.data);
            } catch (err) {
                console.error("Erreur API:", err.response?.data || err.message);
                setError("Impossible de charger le frais.");
            } finally {
                setLoading(false);
            }
        };
        fetchFrais();
    }, [id]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!frais) return <div>Frais non trouvé</div>;

    return <FraisForm frais={frais} />;
}

export default FraisEdit;
