import "./Loader.css";

/**
 * Indicador de carga reutilizable con mensaje configurable.
 * @param {{ message?: string }} props
 */
export default function Loader({ message = "Escaneando PokéAPI…" }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__ring" />
      <p className="loader__text">{message}</p>
    </div>
  );
}
