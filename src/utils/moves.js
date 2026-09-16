/**
 * De la lista cruda `pokemon.moves` (que trae la PokéAPI repetida por
 * cada versión del juego), deja solo los aprendidos por nivel,
 * sin duplicados, ordenados de menor a mayor nivel.
 * @param {Array} movesRaw
 */
export function getLevelUpMoves(movesRaw = []) {
  const map = new Map();

  movesRaw.forEach((m) => {
    const levelDetail = m.version_group_details.find(
      (d) => d.move_learn_method.name === "level-up"
    );
    if (levelDetail && !map.has(m.move.name)) {
      map.set(m.move.name, levelDetail.level_learned_at);
    }
  });

  return Array.from(map, ([name, level]) => ({ name, level })).sort(
    (a, b) => a.level - b.level
  );
}