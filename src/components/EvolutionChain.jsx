import { Link } from "react-router-dom";
import { capitalize } from "../utils/typeColors";
import "./EvolutionChain.css";

function spriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function EvolutionNode({ node, showTrigger }) {
  return (
    <div className="evolution-node">
      {showTrigger && (
        <div className="evolution-node__trigger">→ {node.trigger}</div>
      )}
      <Link to={`/pokemon/${node.name}`} className="evolution-node__pokemon">
        <img src={spriteUrl(node.id)} alt={node.name} loading="lazy" />
        <span>{capitalize(node.name)}</span>
      </Link>
    </div>
  );
}

function renderBranch(node, isRoot) {
  return (
    <div className="evolution-branch" key={node.name}>
      <EvolutionNode node={node} showTrigger={!isRoot} />
      {node.evolvesTo.length > 0 && (
        <div className="evolution-branch__children">
          {node.evolvesTo.map((child) => renderBranch(child, false))}
        </div>
      )}
    </div>
  );
}

/**
 * Renderiza la cadena evolutiva completa a partir del árbol
 * ya parseado por utils/evolution.js (parseEvolutionChain).
 * @param {{ chain: object }} props
 */
export default function EvolutionChain({ chain }) {
  if (!chain) return null;

  return <div className="evolution-chain">{renderBranch(chain, true)}</div>;
}