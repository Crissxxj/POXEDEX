import { Link } from "react-router-dom";
import TypeBadge from "./TypeBadge";
import useFavorites from "../hooks/useFavorites";
import { getTypeColor, capitalize } from "../utils/typeColors";
import "./PokemonCard.css";

export default function PokemonCard({ pokemon }) {
  const mainColor = getTypeColor(pokemon.types[0]);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(pokemon);
  };

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="poke-card"
      style={{ "--card-glow": mainColor }}
    >
      <button
        type="button"
        className={"poke-card__fav" + (favorite ? " poke-card__fav--active" : "")}
        onClick={handleFavoriteClick}
        aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        aria-pressed={favorite}
      >
        ♥
      </button>
      <span className="poke-card__id">#{String(pokemon.id).padStart(3, "0")}</span>
      <div className="poke-card__art">
        {pokemon.image ? (
          <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
        ) : (
          <span className="poke-card__placeholder">?</span>
        )}
      </div>
      <h3 className="poke-card__name">{capitalize(pokemon.name)}</h3>
      <div className="poke-card__types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t} type={t} />
        ))}
      </div>
    </Link>
  );
}