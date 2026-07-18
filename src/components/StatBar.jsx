import "./StatBar.css";

const STAT_LABELS = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP.ATK",
  "special-defense": "SP.DEF",
  speed: "SPD",
};

function levelColor(value) {
  if (value >= 90) return "var(--hp-high)";
  if (value >= 50) return "var(--hp-mid)";
  return "var(--hp-low)";
}

/**
 * Barra de estadística reutilizable, estilo lectura de escáner.
 * @param {{ name: string, value: number, max?: number }} props
 */
export default function StatBar({ name, value, max = 180 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="stat-bar">
      <span className="stat-bar__label">{STAT_LABELS[name] || name}</span>
      <div className="stat-bar__track">
        <div
          className="stat-bar__fill"
          style={{ width: `${pct}%`, background: levelColor(value) }}
        />
      </div>
      <span className="stat-bar__value">{value}</span>
    </div>
  );
}
