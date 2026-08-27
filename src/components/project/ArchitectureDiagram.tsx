import React, { useState } from 'react';
import type { ArchitectureNode } from '../../data/types';
import './ArchitectureDiagram.css';

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  projectName: string;
}

const STATUS_LABEL: Record<ArchitectureNode['status'], string> = {
  implemented: 'Implemented',
  partial: 'Partial',
  planned: 'Planned',
  'in-process': 'In-Process',
};

export default function ArchitectureDiagram({ nodes, projectName }: ArchitectureDiagramProps) {
  const [activeId, setActiveId] = useState<string | null>(nodes[0]?.id ?? null);
  const [animatingSignal, setAnimatingSignal] = useState(false);

  const activeNode = nodes.find(n => n.id === activeId);

  function handleNodeClick(id: string) {
    if (id === activeId) return;
    setActiveId(id);
    // Briefly trigger signal animation
    setAnimatingSignal(true);
    setTimeout(() => setAnimatingSignal(false), 600);
  }

  function runSignalFlow() {
    // Animate through all nodes sequentially
    setAnimatingSignal(true);
    nodes.forEach((n, i) => {
      setTimeout(() => setActiveId(n.id), i * 400);
    });
    setTimeout(() => setAnimatingSignal(false), nodes.length * 400 + 400);
  }

  return (
    <div className="arch">
      <div className="arch__layout">
        {/* ── Left: Node Flow ── */}
        <div className="arch__flow" role="list" aria-label={`${projectName} architecture components`}>
          <div className="arch__flow-header">
            <p className="label arch__flow-title">Architecture</p>
            <button
              className="arch__animate-btn"
              onClick={runSignalFlow}
              aria-label="Animate signal flow through architecture"
              title="Animate query flow"
            >
              ▶ Trace Flow
            </button>
          </div>

          {nodes.map((node, i) => (
            <React.Fragment key={node.id}>
              <button
                className={`arch__node ${activeId === node.id ? 'is-active' : ''} arch__node--${node.status}`}
                onClick={() => handleNodeClick(node.id)}
                role="listitem"
                aria-pressed={activeId === node.id}
                aria-label={`${node.label} — ${node.status}`}
              >
                <div className="arch__node-indicator" />
                <div className="arch__node-content">
                  <span className="arch__node-label">{node.label}</span>
                  {node.sublabel && (
                    <span className="arch__node-sublabel label">{node.sublabel}</span>
                  )}
                </div>
                <span className={`arch__node-status label arch__node-status--${node.status}`}>
                  {STATUS_LABEL[node.status]}
                </span>
              </button>

              {/* Connector line */}
              {i < nodes.length - 1 && (
                <div
                  className={`arch__connector ${animatingSignal && activeId === node.id ? 'is-active' : ''}`}
                  aria-hidden="true"
                >
                  <div className="arch__connector-line" />
                  <div className="arch__connector-arrow">↓</div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Right: Component Detail Panel ── */}
        {activeNode && (
          <div
            className="arch__panel"
            key={activeNode.id}
            aria-live="polite"
            aria-label={`Details for ${activeNode.label}`}
          >
            <div className="arch__panel-header">
              <h3 className="arch__panel-title">{activeNode.label}</h3>
              {activeNode.sublabel && (
                <p className="arch__panel-sub label">{activeNode.sublabel}</p>
              )}
              <span className={`arch__panel-status label arch__panel-status--${activeNode.status}`}>
                {STATUS_LABEL[activeNode.status]}
              </span>
            </div>

            <div className="arch__panel-body">
              <div className="arch__panel-field">
                <p className="label">Responsibility</p>
                <p>{activeNode.responsibility}</p>
              </div>

              {activeNode.input && (
                <div className="arch__panel-field arch__panel-field--code">
                  <p className="label">Input</p>
                  <pre className="arch__panel-code mono"><code>{activeNode.input}</code></pre>
                </div>
              )}

              {activeNode.output && (
                <div className="arch__panel-field arch__panel-field--code">
                  <p className="label">Output</p>
                  <pre className="arch__panel-code mono"><code>{activeNode.output}</code></pre>
                </div>
              )}

              <div className="arch__panel-field">
                <p className="label">Explanation</p>
                <p className="arch__panel-explanation">{activeNode.explanation}</p>
              </div>

              <div className="arch__panel-field">
                <p className="label">Technologies</p>
                <div className="arch__panel-tech">
                  {activeNode.technologies.map(t => (
                    <span key={t} className="arch__panel-tag mono">{t}</span>
                  ))}
                </div>
              </div>

              {activeNode.codeSnippet && (
                <div className="arch__panel-field">
                  <p className="label">Code Snippet</p>
                  <pre className="arch__panel-snippet mono"><code>{activeNode.codeSnippet}</code></pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
