import TypeBadge from "./TypeBadge";
import PokemonArt from "./PokemonArt";
import { capitalize } from "../utils/typeColors";
import "./ComparePanel.css";

const STAT_ORDER = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
const STAT_LABELS = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP.ATK",
  "special-defense": "SP.DEF",
  speed: "SPD",
};

/**
 * Tarjeta de un lado del comparador: arte, tipos y stats con
 * indicador de qué stat gana frente al Pokémon rival.
 * @param {{ pokemon: object, versus: object }} props
 */
export default function ComparePanel({ pokemon, versus }) {
  const stats = Object.fromEntries(pokemon.stats.map((s) => [s.stat.name, s.base_stat]));
  const versusStats = Object.fromEntries(versus.stats.map((s) => [s.stat.name, s.base_stat]));

  const total = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const versusTotal = versus.stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <div className="compare-panel">
      <div className="compare-panel__art">
        <PokemonArt pokemon={pokemon} compact />
      </div>

      <span className="eyebrow">#{String(pokemon.id).padStart(3, "0")}</span>
      <h2>{capitalize(pokemon.name)}</h2>

      <div className="compare-panel__types">
        {pokemon.types.map(({ type }) => (
          <TypeBadge key={type.name} type={type.name} />
        ))}
      </div>

      <div className="compare-panel__stats">
        {STAT_ORDER.map((statName) => {
          const value = stats[statName] ?? 0;
          const opponentValue = versusStats[statName] ?? 0;
          const winning = value > opponentValue;
          const max = 180;
          const pct = Math.min(100, Math.round((value / max) * 100));

          return (
            <div
              key={statName}
              className={"compare-stat" + (winning ? " compare-stat--win" : "")}
            >
              <span className="compare-stat__label">{STAT_LABELS[statName]}</span>
              <div className="compare-stat__track">
                <div className="compare-stat__fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="compare-stat__value">
                {value} {winning && <span className="compare-stat__arrow">▲</span>}
              </span>
            </div>
          );
        })}

        <div className="compare-panel__total">
          <span>Total</span>
          <strong className={total > versusTotal ? "compare-panel__total--win" : ""}>
            {total}
          </strong>
        </div>
      </div>
    </div>
  );
}