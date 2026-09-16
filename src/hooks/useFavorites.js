import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pokescan:favorites";
const EVENT_NAME = "pokescan:favorites-changed";

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback((pokemon) => {
    const current = readFavorites();
    const exists = current.some((f) => f.id === pokemon.id);
    const next = exists
      ? current.filter((f) => f.id !== pokemon.id)
      : [...current, pokemon];
    writeFavorites(next);
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}