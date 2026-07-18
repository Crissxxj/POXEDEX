import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="container not-found">
      <span className="eyebrow">Error 404</span>
      <h1>Pokémon salvaje no encontrado</h1>
      <p>La ruta que buscas no existe en esta Pokédex.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}
