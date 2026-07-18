import { Link } from "react-router-dom";
import TypeBadge from "./TypeBadge";
import { getTypeColor, capitalize } from "../utils/typeColors";
import "./PokemonCard.css";

/**
 * Card reutilizable que representa un Pokémon dentro de la grilla.
 * @param {{ pokemon: { id:number, name:string, image:string, types:string[] } }} props
 */
export default function PokemonCard({ pokemon }) {
  const mainColor = getTypeColor(pokemon.types[0]);

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="poke-card"
      style={{ "--card-glow": mainColor }}
    >
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
