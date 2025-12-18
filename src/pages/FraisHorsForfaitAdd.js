import { useParams } from "react-router-dom";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";

function FraisHorsForfaitAdd() {
  const { id } = useParams(); // id du frais

  return (
    <div className="frais-hf-add-container">
      <h2>Ajouter un frais hors forfait</h2>
      <FraisHorsForfaitForm idFrais={id} />
    </div>
  );
}

export default FraisHorsForfaitAdd;
