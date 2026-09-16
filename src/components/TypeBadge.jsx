import { getTypeColor, capitalize } from "../utils/typeColors";
import "./TypeBadge.css";

/**
 * Badge de color reutilizable para representar un tipo de Pokémon.
 * Si recibe onClick, se vuelve clicable (usado en los chips de filtro).
 * @param {{ type: string, onClick?: () => void, active?: boolean }} props
 */
export default function TypeBadge({ type, onClick, active }) {
  const clickable = typeof onClick === "function";

  const classNames = [
    "type-badge",
    clickable && "type-badge--clickable",
    active && "type-badge--active",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classNames}
      style={{ "--type-color": getTypeColor(type) }}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {capitalize(type)}
    </span>
  );
}