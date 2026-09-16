import { useEffect, useState } from "react";
import { fetchAllPokemonNames } from "../api/pokeapi";

let cachedNames = null;

export default function useAllPokemonNames() {
  const [names, setNames] = useState(cachedNames || []);
  const [loaded, setLoaded] = useState(Boolean(cachedNames));

  useEffect(() => {
    if (cachedNames) return;
    let active = true;

    fetchAllPokemonNames()
      .then((results) => {
        cachedNames = results;
        if (active) {
          setNames(results);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (active) setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return { names, loaded };
}