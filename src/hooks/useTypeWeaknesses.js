import { useEffect, useState } from "react";
import { fetchTypeDetail } from "../api/pokeapi";
import { POKEMON_TYPES } from "../data/filters";

/**
 * Dado un arreglo de tipos (ej. ["fire", "flying"]), calcula el
 * multiplicador de daño recibido por cada uno de los 18 tipos,
 * combinando las tablas de todos los tipos del Pokémon.
 * @param {string[]} types
 */
export default function useTypeWeaknesses(types) {
  const [multipliers, setMultipliers] = useState(null);
  const [loading, setLoading] = useState(true);

  const typesKey = types.join(",");

  useEffect(() => {
    if (!typesKey) return;

    let active = true;
    setLoading(true);

    Promise.all(typesKey.split(",").map((t) => fetchTypeDetail(t)))
      .then((details) => {
        const result = {};
        POKEMON_TYPES.forEach((t) => {
          result[t] = 1;
        });

        details.forEach(({ damage_relations }) => {
          damage_relations.double_damage_from.forEach((t) => {
            result[t.name] = (result[t.name] ?? 1) * 2;
          });
          damage_relations.half_damage_from.forEach((t) => {
            result[t.name] = (result[t.name] ?? 1) * 0.5;
          });
          damage_relations.no_damage_from.forEach((t) => {
            result[t.name] = 0;
          });
        });

        if (active) setMultipliers(result);
      })
      .catch(() => {
        if (active) setMultipliers(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [typesKey]);

  const weaknesses = multipliers
    ? Object.entries(multipliers)
        .filter(([, m]) => m > 1)
        .sort((a, b) => b[1] - a[1])
    : [];

  const resistances = multipliers
    ? Object.entries(multipliers)
        .filter(([, m]) => m < 1)
        .sort((a, b) => a[1] - b[1])
    : [];

  return { weaknesses, resistances, loading };
}
