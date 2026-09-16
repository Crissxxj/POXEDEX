import { useState } from "react";
import usePokemonList from "../hooks/usePokemonList";
import useAllPokemonNames from "../hooks/useAllPokemonNames";
import usePokemonSearch from "../hooks/usePokemonSearch";
import usePokemonFilter from "../hooks/usePokemonFilter";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import TypeBadge from "../components/TypeBadge";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { POKEMON_TYPES, GENERATIONS } from "../data/filters";
import "./Pokedex.css";

export default function Pokedex() {
  const { pokemons, loading, loadingMore, hasMore, error, loadMore } =
    usePokemonList();
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGen, setSelectedGen] = useState(null);

  const { names: allNames } = useAllPokemonNames();
  const { results: searchResults, searching } = usePokemonSearch(query, allNames);
  const { results: filterResults, loading: filtering, isFiltering } =
    usePokemonFilter(selectedType, selectedGen, allNames);

  const isSearching = query.trim().length > 0;

  const displayed = isSearching
    ? searchResults
    : isFiltering
    ? filterResults
    : pokemons;

  const showLoader = loading || (isSearching && searching) || (isFiltering && filtering);

  const toggleType = (type) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const toggleGen = (gen) => {
    setSelectedGen((prev) => (prev?.id === gen.id ? null : gen));
  };

  return (
    <div className="container pokedex-page">
      <div className="pokedex-page__header">
        <div>
          <span className="eyebrow">Base de datos</span>
          <h1>Pokédex</h1>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="pokedex-filters">
        <div className="pokedex-filters__row">
          {POKEMON_TYPES.map((type) => (
            <TypeBadge
              key={type}
              type={type}
              active={selectedType === type}
              onClick={() => toggleType(type)}
            />
          ))}
        </div>
        <div className="pokedex-filters__row">
          {GENERATIONS.map((gen) => (
            <button
              key={gen.id}
              className={`gen-chip${selectedGen?.id === gen.id ? " gen-chip--active" : ""}`}
              onClick={() => toggleGen(gen)}
            >
              {gen.label}
            </button>
          ))}
        </div>
      </div>

      {showLoader && <Loader />}
      {error && !loading && <ErrorMessage message={error} />}

      {!showLoader && !error && (
        <>
          {displayed.length === 0 ? (
            <p className="pokedex-page__empty">
              {isSearching
                ? `No hay resultados para "${query}".`
                : "No hay Pokémon que coincidan con el filtro."}
            </p>
          ) : (
            <div className="pokedex-grid">
              {displayed.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>
          )}

          {!isSearching && !isFiltering && hasMore && (
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