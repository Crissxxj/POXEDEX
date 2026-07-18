import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          PokéScan — Proyecto académico construido con React + PokéAPI.
        </p>
        <p className="footer__text footer__text--mono">
          Datos por{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            pokeapi.co
          </a>
        </p>
      </div>
    </footer>
  );
}
