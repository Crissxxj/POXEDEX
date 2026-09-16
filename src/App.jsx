import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import PokemonDetail from "./pages/PokemonDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          {/* La ruta de favoritos debe ir aquí adentro */}
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}