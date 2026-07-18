import { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../api/pokeapi";

/**
 * Hook reutilizable que obtiene el detalle de un Pokémon
 * cada vez que cambia el parámetro `nameOrId`.
 */
export default function usePokemonDetail(nameOrId) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchPokemonDetail(nameOrId)
      .then((data) => {
        if (active) setPokemon(data);
      })
      .catch(() => {
        if (active) setError("No encontramos ese Pokémon en la PokéAPI.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [nameOrId]);

  return { pokemon, loading, error };
}
