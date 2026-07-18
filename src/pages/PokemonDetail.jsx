import { Link, useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import TypeBadge from "../components/TypeBadge";
import StatBar from "../components/StatBar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getTypeColor, capitalize } from "../utils/typeColors";
import "./PokemonDetail.css";

export default function PokemonDetail() {
  const { name } = useParams();
  const { pokemon, loading, error } = usePokemonDetail(name);

  if (loading) return <Loader message={`Escaneando a ${capitalize(name)}…`} />;
  if (error) return <ErrorMessage message={error} />;
  if (!pokemon) return null;

  const mainColor = getTypeColor(pokemon.types[0]?.type?.name);
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <div className="container detail-page">
      <Link to="/pokedex" className="detail-page__back">
        ← Volver a la Pokédex
      </Link>

      <div className="detail-card" style={{ "--card-glow": mainColor }}>
        <div className="detail-card__art">
          <img src={image} alt={pokemon.name} />
        </div>

        <div className="detail-card__info">
          <span className="eyebrow">#{String(pokemon.id).padStart(3, "0")}</span>
          <h1>{capitalize(pokemon.name)}</h1>

          <div className="detail-card__types">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name} />
            ))}
          </div>

          <div className="detail-card__meta">
            <div>
              <span className="detail-card__meta-label">Altura</span>
              <span className="detail-card__meta-value">{pokemon.height / 10} m</span>
            </div>
            <div>
              <span className="detail-card__meta-label">Peso</span>
              <span className="detail-card__meta-value">{pokemon.weight / 10} kg</span>
            </div>
          </div>

          <h2 className="detail-card__section-title">Habilidades</h2>
          <div className="detail-card__abilities">
            {pokemon.abilities.map(({ ability }) => (
              <span key={ability.name} className="ability-pill">
                {capitalize(ability.name.replace("-", " "))}
              </span>
            ))}
          </div>

          <h2 className="detail-card__section-title">Estadísticas base</h2>
          <div className="detail-card__stats">
            {pokemon.stats.map((s) => (
              <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
