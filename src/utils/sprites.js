// Helpers para elegir la imagen correcta del Pokémon según el modo
// (estático/animado, normal/shiny) y para obtener el audio de su grito.

export function hasAnimatedSprite(pokemon) {
  return Boolean(
    pokemon?.sprites?.versions?.["generation-v"]?.["black-white"]?.animated
      ?.front_default
  );
}

/**
 * Devuelve la mejor URL de imagen disponible según las opciones pedidas,
 * con fallback en cascada por si el Pokémon no tiene esa variante.
 * @param {object} pokemon - objeto Pokémon completo de la PokéAPI
 * @param {{ shiny?: boolean, animated?: boolean }} options
 */
export function getArtwork(pokemon, { shiny = false, animated = false } = {}) {
  const anim =
    pokemon?.sprites?.versions?.["generation-v"]?.["black-white"]?.animated;

  if (animated && anim) {
    const gif = shiny ? anim.front_shiny : anim.front_default;
    if (gif) return gif;
  }

  const official = pokemon?.sprites?.other?.["official-artwork"];
  if (shiny && official?.front_shiny) return official.front_shiny;
  if (official?.front_default) return official.front_default;

  return (
    (shiny ? pokemon?.sprites?.front_shiny : pokemon?.sprites?.front_default) ||
    pokemon?.sprites?.front_default ||
    null
  );
}

/**
 * URL del grito del Pokémon (formato .ogg servido por PokéAPI/cries).
 */
export function getCryUrl(pokemon) {
  return pokemon?.cries?.latest || pokemon?.cries?.legacy || null;
}
