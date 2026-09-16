import { useEffect, useState } from "react";
import { fetchPokemonSummaries } from "../api/pokeapi";

const MAX_RESULTS = 48;
const DEBOUNCE_MS = 300;

export default function usePokemonSearch(query, allNames) {
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      setResults([]);
      setSearching(false);
      return;
    }

    let active = true;
    setSearching(true);

    const timeoutId = setTimeout(() => {
      const matches = allNames
        .filter((p) => p.name.includes(q))
        .slice(0, MAX_RESULTS);

      if (matches.length === 0) {
        if (active) {
          setResults([]);
          setSearching(false);
        }
        return;
      }

      fetchPokemonSummaries(matches)
        .then((summaries) => {
          if (active) setResults(summaries);
        })
        .finally(() => {
          if (active) setSearching(false);
        });
    }, DEBOUNCE_MS);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [query, allNames]);

  return { results, searching };
}