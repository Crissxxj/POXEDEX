import TypeBadge from "./TypeBadge";
import "./TypeMatchup.css";

const MULTIPLIER_LABELS = { 4: "×4", 2: "×2", 0.5: "×½", 0.25: "×¼", 0: "×0" };

function formatMultiplier(value) {
  return MULTIPLIER_LABELS[value] || `×${value}`;
}

/**
 * Muestra las debilidades y resistencias de tipo de un Pokémon.
 * @param {{ weaknesses: [string, number][], resistances: [string, number][], loading: boolean }} props
 */
export default function TypeMatchup({ weaknesses, resistances, loading }) {
  if (loading) {
    return <p className="type-matchup__loading">Calculando debilidades…</p>;
  }

  return (
    <div className="type-matchup">
      <div className="type-matchup__group">
        <span className="type-matchup__label type-matchup__label--weak">
          Débil contra
        </span>
        <div className="type-matchup__badges">
          {weaknesses.length === 0 && (
            <span className="type-matchup__empty">Ninguna debilidad notable</span>
          )}
          {weaknesses.map(([type, multiplier]) => (
            <div key={type} className="type-matchup__badge">
              <TypeBadge type={type} />
              <span className="type-matchup__multiplier">
                {formatMultiplier(multiplier)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {resistances.length > 0 && (
        <div className="type-matchup__group">
          <span className="type-matchup__label type-matchup__label--resist">
            Resiste a
          </span>
          <div className="type-matchup__badges">
            {resistances.map(([type, multiplier]) => (
              <div key={type} className="type-matchup__badge">
                <TypeBadge type={type} />
                <span className="type-matchup__multiplier">
                  {formatMultiplier(multiplier)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}