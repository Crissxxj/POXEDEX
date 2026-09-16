import { NavLink } from "react-router-dom";
import "./Navbar.css";

const LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/pokedex", label: "Pokédex" },
  { to: "/comparador", label: "Comparador" },
  { to: "/about", label: "Acerca de" },
  { to: "/favoritos", label: "Favoritos" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" end>
          <span className="navbar__dot" />
          PokéScan
        </NavLink>

        <nav className="navbar__links" aria-label="Navegación principal">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                "navbar__link" + (isActive ? " navbar__link--active" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}