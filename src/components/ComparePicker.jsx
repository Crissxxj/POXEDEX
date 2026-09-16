import { useState } from "react";
import { capitalize } from "../utils/typeColors";
import "./ComparePicker.css";

const MAX_SUGGESTIONS = 6;

/**
 * Buscador con sugerencias para elegir un Pokémon a comparar.
 * @param {{ label: string, value: string, onSelect: (name:string)=>void, names: {name:string,url:string}[], disabledName?: string }} props
 */
export default function ComparePicker({ label, value, onSelect, names, disabledName }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const suggestions = q
    ? names
        .filter((p) => p.name.includes(q) && p.name !== disabledName)
        .slice(0, MAX_SUGGESTIONS)
    : [];

  const handlePick = (name) => {
    onSelect(name);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="compare-picker">
      <span className="compare-picker__label">{label}</span>
      <div className="compare-picker__current">{capitalize(value)}</div>

      <div className="compare-picker__search">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder="Buscar Pokémon…"
          aria-label={`Buscar Pokémon para ${label}`}
        />

        {open && suggestions.length > 0 && (
          <ul className="compare-picker__suggestions">
            {suggestions.map((p) => (
              <li key={p.name}>
                <button type="button" onMouseDown={() => handlePick(p.name)}>
                  {capitalize(p.name)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}