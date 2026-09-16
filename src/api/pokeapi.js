import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

const api = axios.create({ baseURL: BASE_URL });

/**
 * Obtiene una página de la lista de Pokémon (solo nombre + url).
 * @param {number} limit
 * @param {number} offset
 */
export async function fetchPokemonPage(limit = 24, offset = 0) {
  const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return data; // { count, next, previous, results: [{name, url}] }
}

/**
 * Obtiene el detalle completo de un Pokémon por nombre o id.
 * @param {string|number} nameOrId
 */
export async function fetchPokemonDetail(nameOrId) {
  const { data } = await api.get(`/pokemon/${nameOrId}`);
  return data;
}

/**
 * Obtiene detalles resumidos para una lista de resultados {name, url}.
 * Se usa para pintar las cards con imagen y tipos sin pedir todo el detalle.
 */
export async function fetchPokemonSummaries(results) {
  const requests = results.map((r) => api.get(r.url).then((res) => res.data));
  const data = await Promise.all(requests);
  return data.map((p) => ({
    id: p.id,
    name: p.name,
    image:
      p.sprites?.other?.["official-artwork"]?.front_default ||
      p.sprites?.front_default,
    types: p.types.map((t) => t.type.name),
  }));
}

export async function fetchAllPokemonNames() {
  const { data } = await api.get(`/pokemon?limit=100000&offset=0`);
  return data.results; // [{ name, url }, ...]
}

/**
 * Obtiene todos los Pokémon que pertenecen a un tipo dado.
 * Se usa para el filtro por tipo en la Pokédex.
 * @param {string} type
 */
export async function fetchPokemonByType(type) {
  const { data } = await api.get(`/type/${type}`);
  return data.pokemon.map((entry) => entry.pokemon); // [{ name, url }, ...]
}

/**
 * Obtiene la ficha de "especie" de un Pokémon: descripciones en distintos
 * idiomas y la url de su cadena evolutiva.
 * @param {string|number} idOrName
 */
export async function fetchPokemonSpecies(idOrName) {
  const { data } = await api.get(`/pokemon-species/${idOrName}`);
  return data;
}

/**
 * Obtiene la cadena evolutiva completa a partir de la url
 * que trae fetchPokemonSpecies (species.evolution_chain.url).
 * @param {string} url
 */
export async function fetchEvolutionChain(url) {
  const { data } = await api.get(url);
  return data;
}

/**
 * Obtiene el detalle de un tipo, incluyendo damage_relations
 * (contra qué tipos es débil/resistente/inmune). Se usa para
 * calcular las debilidades en la página de detalle.
 * @param {string} type
 */
export async function fetchTypeDetail(type) {
  const { data } = await api.get(`/type/${type}`);
  return data;
}

export default api;