import { Link } from "react-router-dom";
import "./Home.css";

const FEATURES = [
  {
    label: "01",
    title: "Datos en vivo",
    text: "Cada carta y cada ficha se llena consultando PokéAPI en tiempo real, sin datos escritos a mano.",
  },
  {
    label: "02",
    title: "Componentes reutilizables",
    text: "PokemonCard, TypeBadge y StatBar se reusan en toda la app recibiendo su información por props.",
  },
  {
    label: "03",
    title: "Escaneo instantáneo",
    text: "Busca por nombre y entra al detalle de cada Pokémon con sus estadísticas base y habilidades.",
  },
];

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="container home__hero-inner">
          <div className="home__hero-text">
            <span className="eyebrow">Pokédex · React · PokéAPI</span>
            <h1 className="home__title">
              Escanea el mundo Pokémon
              <br />
              directo desde el navegador.
            </h1>
            <p className="home__subtitle">
              PokéScan es una Pokédex construida con React que consulta PokéAPI
              para mostrar información dinámica de más de mil Pokémon:
              tipos, estadísticas base y habilidades.
            </p>
            <div className="home__cta">
              <Link to="/pokedex" className="btn btn-primary">
                Abrir Pokédex
              </Link>
              <Link to="/about" className="btn btn-ghost">
                Cómo está hecho
              </Link>
            </div>
          </div>

          <div className="home__scanner" aria-hidden="true">
            <div className="scanner__frame">
              <div className="scanner__line" />
              <span className="scanner__ball" />
              <div className="scanner__grid" />
            </div>
          </div>
        </div>
      </section>

      <section className="home__features">
        <div className="container home__features-grid">
          {FEATURES.map((f) => (
            <article key={f.label} className="feature-card">
              <span className="feature-card__label">{f.label}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
