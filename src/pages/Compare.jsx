import { useState } from "react";
import usePokemonDetail from "../hooks/usePokemonDetail";
import useAllPokemonNames from "../hooks/useAllPokemonNames";
import ComparePicker from "../components/ComparePicker";
import ComparePanel from "../components/ComparePanel";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import "./Compare.css";

export default function Compare() {
  const { names } = useAllPokemonNames();
  const [nameA, setNameA] = useState("pikachu");
  const [nameB, setNameB] = useState("bulbasaur");

  const { pokemon: a, loading: loadingA, error: errorA } = usePokemonDetail(nameA);
  const { pokemon: b, loading: loadingB, error: errorB } = usePokemonDetail(nameB);

  const loading = loadingA || loadingB;

  return (
    <div className="container compare-page">
      <div className="compare-page__header">
        <span className="eyebrow">Laboratorio</span>
        <h1>Comparador</h1>
        <p>Elige dos Pokémon y compara sus estadísticas cara a cara.</p>
      </div>

      <div className="compare-pickers">
        <ComparePicker label="Pokémon A" value={nameA} onSelect={setNameA} names={names} disabledName={nameB} />
        <span className="compare-vs">VS</span>
        <ComparePicker label="Pokémon B" value={nameB} onSelect={setNameB} names={names} disabledName={nameA} />
      </div>

      {loading && <Loader message="Escaneando a ambos Pokémon…" />}
      {(errorA || errorB) && <ErrorMessage message={errorA || errorB} />}

      {a && b && !loading && (
        <div className="compare-grid">
          <ComparePanel pokemon={a} versus={b} />
          <ComparePanel pokemon={b} versus={a} />
        </div>
      )}
    </div>
  );
}