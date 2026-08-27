import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import QueryBar from '../components/query/QueryBar';
import ResultsPanel from '../components/results/ResultsPanel';
import './HomePage.css';

// Quick action button definitions
const QUICK_ACTIONS = [
  { label: 'About',          icon: '◎', query: 'SELECT * FROM about;' },
  { label: 'Projects',       icon: '⬡', query: 'SELECT * FROM projects;' },
  { label: 'Skills',         icon: '⎔', query: 'SELECT * FROM skills;' },
  { label: 'Certifications', icon: '⚲', query: 'SELECT * FROM certifications;' },
  { label: 'Contact',        icon: '→', query: 'SELECT * FROM contact;' },
];

// Shorthand reference shown in the right panel
const SHORTCUTS = [
  { label: 'vlsi',              arrow: "WHERE domain = 'VLSI'" },
  { label: 'databases',         arrow: "WHERE domain = 'Databases'" },
  { label: 'hardware skills',   arrow: "WHERE category = 'Hardware'" },
  { label: 'languages',         arrow: "WHERE category = 'Languages'" },
  { label: 'tinyml projects',   arrow: "WHERE domain = 'TinyML'" },
  { label: 'c++ projects',      arrow: "WHERE technologies = 'C++17'" },
];

export default function HomePage() {
  const {
    queryText, setQueryText,
    result, state, history,
    executeQuery, typeAndExecute, clearResult,
  } = useQuery();

  const [searchParams] = useSearchParams();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Handle ?q=projects style navigation from navbar
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      const sectionMap: Record<string, string> = {
        projects:   'SELECT * FROM projects;',
        skills:     'SELECT * FROM skills;',
        about:      'SELECT * FROM about;',
        contact:    'SELECT * FROM contact;',
      };
      const query = sectionMap[q.toLowerCase()];
      if (query) typeAndExecute(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isExecuting = state === 'executing';

  return (
    <main className="home">
      {/* ── Hero Section ── */}
      <section className="home__hero" aria-labelledby="hero-name">
        <div className="container">
          <div className="home__hero-layout">

            {/* LEFT — name + tagline */}
            <div className="home__hero-left">
              <h1 id="hero-name" className="home__name">
                Sarthak<br />Patil
              </h1>

              <p className="home__title label">
                Software Engineer
                <span className="home__title-sep" aria-hidden="true"> · </span>
                Systems
                <span className="home__title-sep" aria-hidden="true"> · </span>
                Databases
              </p>

              <p className="home__tagline">
                Don't browse my portfolio.
                <br />
                <em>Query it.</em>
              </p>

              <p className="home__sub">
                A personal engineering system — structured, queryable, explorable.
              </p>
            </div>

            {/* RIGHT — SQL shortcuts cheat sheet */}
            <div className="home__hero-right">
              <div className="home__shortcuts-card">
                <div className="home__shortcuts-header">
                  <span className="home__shortcuts-title label">QUICK SYNTAX</span>
                  <span className="home__shortcuts-tag mono">NL → SQL</span>
                </div>
                <ul className="home__shortcuts-list">
                  {SHORTCUTS.map(s => (
                    <li
                      key={s.label}
                      className="home__shortcut-row"
                      onClick={() => typeAndExecute(s.label)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && typeAndExecute(s.label)}
                      title={`Run: ${s.label}`}
                    >
                      <code className="home__shortcut-label">{s.label}</code>
                      <code className="home__shortcut-value">{s.arrow}</code>
                    </li>
                  ))}
                </ul>
                <div className="home__shortcuts-hint label">CLICK ANY ROW TO RUN IT</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Query Section ── */}
      <section
        className="home__query-section"
        aria-label="Portfolio query interface"
      >
        <div className="container">
          <div className="home__query-wrapper">
            {/* Query bar */}
            <QueryBar
              value={queryText}
              onChange={setQueryText}
              onExecute={() => executeQuery()}
              state={state}
              history={history}
            />

            {/* Quick actions */}
            <div className="home__quick-actions" role="group" aria-label="Quick query actions">
              <p className="label home__quick-label">Quick queries</p>
              <div className="home__quick-buttons">
                {QUICK_ACTIONS.map(action => (
                  <button
                    key={action.label}
                    className="home__quick-btn"
                    onClick={() => typeAndExecute(action.query)}
                    disabled={state === 'typing' || state === 'executing'}
                    aria-label={`Run: ${action.query}`}
                  >
                    <span className="home__quick-icon" aria-hidden="true">{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <ResultsPanel result={result} isExecuting={isExecuting} onClose={clearResult} />
        </div>
      </section>

      {/* ── Schema section (bottom) ── */}
      {!result && !isExecuting && (
        <section className="home__schema" aria-label="Available data tables">
          <div className="container">
            <div className="home__schema-inner">
              <p className="label home__schema-label">Available Tables</p>
              <div className="home__schema-tables">
                {['about', 'projects', 'skills', 'certifications', 'contact'].map(table => (
                  <button
                    key={table}
                    className="home__schema-table mono"
                    onClick={() => typeAndExecute(`SELECT * FROM ${table};`)}
                    aria-label={`Query ${table} table`}
                  >
                    <span className="home__schema-table-icon" aria-hidden="true">⊞</span>
                    {table}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
