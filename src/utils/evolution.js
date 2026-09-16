import { extractIdFromUrl } from "../data/filters";

// Describe en texto corto cómo evoluciona (nivel, objeto, intercambio, etc.)
function describeEvolutionDetail(detail) {
  if (!detail) return "Evoluciona";
  if (detail.min_level) return `Nvl. ${detail.min_level}`;
  if (detail.item?.name) return `Usar ${detail.item.name.replace(/-/g, " ")}`;
  if (detail.min_happiness) return "Amistad alta";
  if (detail.trigger?.name === "trade") return "Intercambio";
  return "Evoluciona";
}

/**
 * Convierte el árbol crudo que devuelve /evolution-chain/{id}
 * en una estructura simple: { id, name, evolvesTo: [...] }
 * Cada hijo trae además `trigger`: el texto de cómo evoluciona.
 */
export function parseEvolutionChain(chainNode) {
  const id = extractIdFromUrl(chainNode.species.url);

  const evolvesTo = (chainNode.evolves_to || []).map((child) => ({
    ...parseEvolutionChain(child),
    trigger: describeEvolutionDetail(child.evolution_details?.[0]),
  }));

  return {
    id,
    name: chainNode.species.name,
    evolvesTo,
  };
}