import { useMemo, useState } from "react";
import usePokemonList from "../hooks/usePokemonList";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import "./Pokedex.css";

export default function Pokedex() {
  const { pokemons, loading, loadingMore, hasMore, error, loadMore } =
    usePokemonList();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pokemons;
    return pokemons.filter((p) => p.name.includes(q));
  }, [pokemons, query]);

  return (
    <div className="container pokedex-page">
      <div className="pokedex-page__header">
        <div>
          <span className="eyebrow">Base de datos</span>
          <h1>Pokédex</h1>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading && <Loader />}
      {error && !loading && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className="pokedex-page__empty">
              No hay resultados para “{query}”.
            </p>
          ) : (
            <div className="pokedex-grid">
              {filtered.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>
          )}

          {!query && hasMore && (
            <div className="pokedex-page__more">
              <button className="btn btn-ghost" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? "Cargando…" : "Cargar más"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
