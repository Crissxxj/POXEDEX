import "./SearchBar.css";

/**
 * Input de búsqueda controlado y reutilizable.
 * @param {{ value: string, onChange: (v:string) => void, placeholder?: string }} props
 */
export default function SearchBar({ value, onChange, placeholder = "Buscar Pokémon…" }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">⌕</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar Pokémon por nombre"
      />
    </div>
  );
}
