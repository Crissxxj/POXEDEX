import { useState } from "react";
import usePokemonList from "../hooks/usePokemonList";
import useAllPokemonNames from "../hooks/useAllPokemonNames";
import usePokemonSearch from "../hooks/usePokemonSearch";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import "./Pokedex.css";

export default function Pokedex() {
  const { pokemons, loading, loadingMore, hasMore, error, loadMore } =
    usePokemonList();
  const [query, setQuery] = useState("");

  const { names: allNames } = useAllPokemonNames();
  const { results: searchResults, searching } = usePokemonSearch(query, allNames);

  const isSearching = query.trim().length > 0;
  const displayed = isSearching ? searchResults : pokemons;
  const showLoader = loading || (isSearching && searching);

  return (
    <div className="container pokedex-page">
      <div className="pokedex-page__header">
        <div>
          <span className="eyebrow">Base de datos</span>
          <h1>Pokédex</h1>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {showLoader && <Loader />}
      {error && !loading && <ErrorMessage message={error} />}

      {!showLoader && !error && (
        <>
          {displayed.length === 0 ? (
            <p className="pokedex-page__empty">
              No hay resultados para “{query}”.
            </p>
          ) : (
            <div className="pokedex-grid">
              {displayed.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>
          )}

          {!isSearching && hasMore && (
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