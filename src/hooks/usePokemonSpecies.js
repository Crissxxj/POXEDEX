import { useEffect, useState } from "react";
import { fetchPokemonSpecies, fetchEvolutionChain } from "../api/pokeapi";
import { parseEvolutionChain } from "../utils/evolution";

/**
 * Hook que, a partir del id de un Pokémon, trae:
 * - descriptionEs: la descripción/flavor text en español
 * - evolutionChain: la cadena evolutiva ya parseada (ver utils/evolution.js)
 */
export default function usePokemonSpecies(id) {
  const [descriptionEs, setDescriptionEs] = useState("");
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let active = true;
    setLoading(true);

    fetchPokemonSpecies(id)
      .then(async (species) => {
        const flavor = species.flavor_text_entries.find(
          (entry) => entry.language.name === "es"
        );
        const cleanText = flavor
          ? flavor.flavor_text.replace(/[\n\f\r]+/g, " ")
          : "";

        if (active) setDescriptionEs(cleanText);

        const evoData = await fetchEvolutionChain(species.evolution_chain.url);
        if (active) setEvolutionChain(parseEvolutionChain(evoData.chain));
      })
      .catch(() => {
        if (active) {
          setDescriptionEs("");
          setEvolutionChain(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  return { descriptionEs, evolutionChain, loading };
}