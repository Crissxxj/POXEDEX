import { useEffect, useState } from "react";
import { fetchPokemonByType, fetchPokemonSummaries } from "../api/pokeapi";
import { extractIdFromUrl } from "../data/filters";

const MAX_RESULTS = 60;

/**
 * Hook que filtra el listado de Pokémon por tipo y/o generación.
 * @param {string|null} type
 * @param {{from:number,to:number}|null} generation
 * @param {{name:string,url:string}[]} allNames lista completa (de useAllPokemonNames)
 */
export default function usePokemonFilter(type, generation, allNames) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFiltering = Boolean(type) || Boolean(generation);

  useEffect(() => {
    if (!isFiltering) {
      setResults([]);
      return;
    }

    let active = true;
    setLoading(true);

    const getBaseList = () => (type ? fetchPokemonByType(type) : Promise.resolve(allNames));

    getBaseList()
      .then((list) => {
        let filtered = list;
        if (generation) {
          filtered = filtered.filter((p) => {
            const id = extractIdFromUrl(p.url);
            return id !== null && id >= generation.from && id <= generation.to;
          });
        }
        return fetchPokemonSummaries(filtered.slice(0, MAX_RESULTS));
      })
      .then((summaries) => {
        if (active) setResults(summaries);
      })
      .catch(() => {
        if (active) setResults([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, generation, allNames]);

  return { results, loading, isFiltering };
}