import { getTypeColor, capitalize } from "../utils/typeColors";
import "./TypeBadge.css";

/**
 * Badge de color reutilizable para representar un tipo de Pokémon.
 * @param {{ type: string }} props
 */
export default function TypeBadge({ type }) {
  return (
    <span className="type-badge" style={{ "--type-color": getTypeColor(type) }}>
      {capitalize(type)}
    </span>
  );
}
