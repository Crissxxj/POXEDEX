// Tipos y generaciones usados por los filtros de la Pokédex.

export const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

export const GENERATIONS = [
  { id: 1, label: "Gen I", from: 1, to: 151 },
  { id: 2, label: "Gen II", from: 152, to: 251 },
  { id: 3, label: "Gen III", from: 252, to: 386 },
  { id: 4, label: "Gen IV", from: 387, to: 493 },
  { id: 5, label: "Gen V", from: 494, to: 649 },
  { id: 6, label: "Gen VI", from: 650, to: 721 },
  { id: 7, label: "Gen VII", from: 722, to: 809 },
  { id: 8, label: "Gen VIII", from: 810, to: 905 },
  { id: 9, label: "Gen IX", from: 906, to: 1025 },
];

// Las urls de PokéAPI vienen como .../pokemon/25/ o .../pokemon-species/25/
// — en ambos casos el id es el último número antes del slash final.
export function extractIdFromUrl(url) {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}