import { useEffect, useState, useCallback } from "react";
import { fetchPokemonPage, fetchPokemonSummaries } from "../api/pokeapi";

const PAGE_SIZE = 24;

/**
 * Hook reutilizable que maneja la carga paginada ("cargar más")
 * del listado de Pokémon consumido desde PokéAPI.
 */
export default function usePokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const loadPage = useCallback(async (currentOffset, isFirst) => {
    if (isFirst) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    try {
      const page = await fetchPokemonPage(PAGE_SIZE, currentOffset);
      const summaries = await fetchPokemonSummaries(page.results);
      setPokemons((prev) => (isFirst ? summaries : [...prev, ...summaries]));
      setHasMore(Boolean(page.next));
      setOffset(currentOffset + PAGE_SIZE);
    } catch {
      setError("No se pudo cargar la información de PokéAPI. Intenta de nuevo.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPage(0, true);
  }, [loadPage]);

  const loadMore = () => {
    if (!loadingMore && hasMore) loadPage(offset, false);
  };

  return { pokemons, loading, loadingMore, hasMore, error, loadMore };
}
