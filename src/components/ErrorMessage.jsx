import "./ErrorMessage.css";

/**
 * Mensaje de error reutilizable para fallos de la API.
 * @param {{ message: string, onRetry?: () => void }} props
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-ghost" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
