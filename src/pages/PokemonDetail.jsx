import { Link, useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import usePokemonSpecies from "../hooks/usePokemonSpecies";
import useTypeWeaknesses from "../hooks/useTypeWeaknesses";
import TypeBadge from "../components/TypeBadge";
import StatBar from "../components/StatBar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EvolutionChain from "../components/EvolutionChain";
import MovesList from "../components/MovesList";
import TypeMatchup from "../components/TypeMatchup";
import { getTypeColor, capitalize } from "../utils/typeColors";
import { getLevelUpMoves } from "../utils/moves";
import "./PokemonDetail.css";

export default function PokemonDetail() {
  const { name } = useParams();
  const { pokemon, loading, error } = usePokemonDetail(name);

  const typeNames = pokemon ? pokemon.types.map((t) => t.type.name) : [];
  const { descriptionEs, evolutionChain } = usePokemonSpecies(pokemon?.id);
  const { weaknesses, resistances, loading: loadingWeaknesses } =
    useTypeWeaknesses(typeNames);

  if (loading) return <Loader message={`Escaneando a ${capitalize(name)}…`} />;
  if (error) return <ErrorMessage message={error} />;
  if (!pokemon) return null;

  const mainColor = getTypeColor(pokemon.types[0]?.type?.name);
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

  const levelUpMoves = getLevelUpMoves(pokemon.moves);

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

          {descriptionEs && (
            <p className="detail-card__description">{descriptionEs}</p>
          )}

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

          <h2 className="detail-card__section-title">Debilidades</h2>
          <TypeMatchup
            weaknesses={weaknesses}
            resistances={resistances}
            loading={loadingWeaknesses}
          />

          <h2 className="detail-card__section-title">Movimientos (por nivel)</h2>
          <MovesList moves={levelUpMoves} />
        </div>
      </div>

      {evolutionChain && evolutionChain.evolvesTo.length > 0 && (
        <div className="detail-card detail-card--evolution">
          <h2 className="detail-card__section-title">Cadena evolutiva</h2>
          <EvolutionChain chain={evolutionChain} />
        </div>
      )}
    </div>
  );
}