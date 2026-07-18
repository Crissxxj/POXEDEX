# PokéScan — Pokédex en React

Proyecto académico que cumple con los requisitos de la guía práctica:
navegación entre páginas con React Router, consumo de una API externa
(PokéAPI), componentes funcionales reutilizables con props, diseño
responsivo y estructura de código organizada.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
├─ api/pokeapi.js          # Llamadas HTTP a PokéAPI (axios)
├─ hooks/
│  ├─ usePokemonList.js    # Hook: listado paginado ("cargar más")
│  └─ usePokemonDetail.js  # Hook: detalle de un Pokémon por nombre
├─ components/              # Componentes funcionales reutilizables
│  ├─ Navbar.jsx / Footer.jsx
│  ├─ PokemonCard.jsx       # Recibe un pokemon por props
│  ├─ TypeBadge.jsx         # Recibe un type por props
│  ├─ StatBar.jsx           # Recibe name/value por props
│  ├─ SearchBar.jsx         # Input controlado (value/onChange por props)
│  ├─ Loader.jsx / ErrorMessage.jsx
├─ pages/
│  ├─ Home.jsx              # "/"        Landing con hero animado
│  ├─ Pokedex.jsx           # "/pokedex" Listado + búsqueda
│  ├─ PokemonDetail.jsx     # "/pokemon/:name" Detalle dinámico
│  ├─ About.jsx             # "/about"   Explicación del stack
│  └─ NotFound.jsx          # "*"        Ruta 404
├─ utils/typeColors.js      # Colores por tipo + helpers
└─ styles/global.css        # Tokens de diseño (colores, tipografía)
```

## Identidad visual

Tema "escáner Pokédex": fondo oscuro (#10121a), acento rojo Pokédex
(#e3350d) y acento cian de pantalla (#4fd8e0). Tipografía Space
Grotesk (títulos), Inter (texto) y JetBrains Mono (datos/lecturas),
inspirada en la estética de una Pokédex real.

## Tecnologías

- React 19 + Vite
- React Router DOM (navegación entre 4 páginas)
- Axios (consumo de PokéAPI)
- CSS con variables (sin frameworks)
