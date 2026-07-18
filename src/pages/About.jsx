import "./About.css";

const STACK = [
  { name: "React + Vite", detail: "SPA con componentes funcionales y hooks." },
  { name: "React Router DOM", detail: "Navegación entre Inicio, Pokédex y Detalle." },
  { name: "PokéAPI", detail: "Fuente de datos externa consumida con Axios." },
  { name: "CSS con variables", detail: "Tokens de color y tipografía consistentes." },
];

export default function About() {
  return (
    <div className="container about-page">
      <span className="eyebrow">Acerca del proyecto</span>
      <h1>Cómo está construido PokéScan</h1>
      <p className="about-page__intro">
        Este proyecto fue desarrollado como práctica de la asignatura de
        desarrollo web con React. Demuestra navegación entre páginas,
        consumo de una API externa y una estructura de componentes
        reutilizables organizados por responsabilidad.
      </p>

      <div className="about-page__grid">
        {STACK.map((item) => (
          <div key={item.name} className="about-item">
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="about-page__structure">
        <h2>Estructura del código</h2>
        <pre>{`src/
├─ api/          → llamadas a PokéAPI
├─ hooks/        → usePokemonList, usePokemonDetail
├─ components/   → Navbar, PokemonCard, TypeBadge, StatBar…
├─ pages/        → Home, Pokedex, PokemonDetail, About
└─ utils/        → colores por tipo, helpers`}</pre>
      </div>
    </div>
  );
}
