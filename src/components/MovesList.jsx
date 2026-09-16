import { capitalize } from "../utils/typeColors";
import "./MovesList.css";

/**
 * Lista los movimientos aprendidos por nivel.
 * @param {{ moves: {name:string, level:number}[] }} props
 */
export default function MovesList({ moves }) {
  if (!moves || moves.length === 0) {
    return (
      <p className="moves-list__empty">
        Sin movimientos por nivel registrados.
      </p>
    );
  }

  return (
    <div className="moves-list">
      {moves.map((m) => (
        <div key={m.name} className="moves-list__item">
          <span className="moves-list__level">
            {m.level > 0 ? `Nv.${m.level}` : "Inicial"}
          </span>
          <span className="moves-list__name">
            {capitalize(m.name.replace(/-/g, " "))}
          </span>
        </div>
      ))}
    </div>
  );
}