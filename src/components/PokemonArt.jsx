import { useRef, useState } from "react";
import { getArtwork, hasAnimatedSprite, getCryUrl } from "../utils/sprites";
import "./PokemonArt.css";

/**
 * Imagen de un Pokémon con controles de sprite animado, modo shiny
 * y reproducción del grito. Se usa tanto en el detalle como en el
 * comparador (con `compact` para reducir el tamaño de la imagen).
 * @param {{ pokemon: object, compact?: boolean }} props
 */
export default function PokemonArt({ pokemon, compact = false }) {
  const [shiny, setShiny] = useState(false);
  const [animated, setAnimated] = useState(false);
  const audioRef = useRef(null);

  const canAnimate = hasAnimatedSprite(pokemon);
  const cryUrl = getCryUrl(pokemon);
  const image = getArtwork(pokemon, {
    shiny,
    animated: animated && canAnimate,
  });

  const playCry = () => {
    if (!cryUrl) return;
    if (!audioRef.current || audioRef.current.src !== cryUrl) {
      audioRef.current = new Audio(cryUrl);
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  return (
    <div className={"poke-art" + (compact ? " poke-art--compact" : "")}>
      <div
        className={
          "poke-art__frame" +
          (animated && canAnimate ? " poke-art__frame--pixelated" : "")
        }
      >
        {image ? (
          <img key={image} src={image} alt={pokemon.name} className="poke-art__img" />
        ) : (
          <span className="poke-art__placeholder">?</span>
        )}
      </div>

      <div className="poke-art__controls">
        <button
          type="button"
          className={"poke-art__toggle" + (shiny ? " poke-art__toggle--active" : "")}
          onClick={() => setShiny((v) => !v)}
          aria-pressed={shiny}
        >
          ✨ Shiny
        </button>

        <button
          type="button"
          className={"poke-art__toggle" + (animated ? " poke-art__toggle--active" : "")}
          onClick={() => setAnimated((v) => !v)}
          disabled={!canAnimate}
          aria-pressed={animated}
          title={canAnimate ? "" : "Sprite animado no disponible"}
        >
          🎞 Animado
        </button>

        <button
          type="button"
          className="poke-art__toggle"
          onClick={playCry}
          disabled={!cryUrl}
          title={cryUrl ? "" : "Sin audio disponible"}
        >
          🔊 Grito
        </button>
      </div>
    </div>
  );
}