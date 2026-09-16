import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
import PokemonCard from "../components/PokemonCard";
import "./Favorites.css";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="container favorites-page">
      <div className="favorites-page__header">
        <span className="eyebrow">Tu colección</span>
        <h1>Favoritos</h1>
      </div>

      {favorites.length === 0 ? (
        <p className="favorites-page__empty">
          Todavía no tienes favoritos. Ve a la{" "}
          <Link to="/pokedex" className="favorites-page__link">
            Pokédex
          </Link>{" "}
          y marca alguno con el corazón.
        </p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  );
}