import React, { useRef, useEffect, useState } from 'react';
import type { QueryState } from '../../hooks/useQuery';
import './QueryBar.css';

interface QueryBarProps {
  value: string;
  onChange: (v: string) => void;
  onExecute: () => void;
  state: QueryState;
  history: string[];
}

// SQL keywords for simple syntax highlighting
const KEYWORDS = ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'LIMIT', 'AND', 'OR', 'LIKE', 'ASC', 'DESC'];
const TABLES   = ['projects', 'skills', 'about', 'contact'];
const OPERATORS = ['=', '!=', '>'];

function highlightSQL(input: string): React.ReactNode[] {
  // Simple tokenise-and-colour the display layer
  const tokens = input.split(/(\s+|[=!><;,*])/);
  return tokens.map((token, i) => {
    const upper = token.trim().toUpperCase();
    if (KEYWORDS.includes(upper)) {
      return <span key={i} className="qb__kw">{token}</span>;
    }
    if (TABLES.includes(token.trim().toLowerCase())) {
      return <span key={i} className="qb__table">{token}</span>;
    }
    if (OPERATORS.includes(token.trim())) {
      return <span key={i} className="qb__op">{token}</span>;
    }
    if (/^'[^']*'$/.test(token.trim()) || /^"[^"]*"$/.test(token.trim())) {
      return <span key={i} className="qb__str">{token}</span>;
    }
    return <span key={i}>{token}</span>;
  });
}

// Autocomplete suggestions — all verified against the data schema
const SUGGESTIONS = [
  // Full table dumps
  'SELECT * FROM projects;',
  'SELECT * FROM skills;',

  'SELECT * FROM about;',
  'SELECT * FROM contact;',

  // Projects — by domain (exact values in data)
  "SELECT * FROM projects WHERE domain = 'VLSI';",
  "SELECT * FROM projects WHERE domain = 'Databases';",
  "SELECT * FROM projects WHERE domain = 'TinyML / Embedded Systems';",

  // Projects — by technology (array field, exact element match)
  "SELECT * FROM projects WHERE technologies = 'C++17';",
  "SELECT * FROM projects WHERE technologies = 'Python';",
  "SELECT * FROM projects WHERE technologies = 'VLSI';",
  "SELECT * FROM projects WHERE technologies = 'TinyML';",

  // Projects — by technology LIKE (partial match)
  "SELECT * FROM projects WHERE technologies LIKE 'C';",
  "SELECT * FROM projects WHERE technologies LIKE 'Tensor';",

  // Projects — by status
  "SELECT * FROM projects WHERE status = 'complete';",
  "SELECT * FROM projects WHERE status = 'in-progress';",

  // Projects — by featured
  "SELECT * FROM projects WHERE featured = 'true';",


  // Projects — ORDER BY
  'SELECT * FROM projects ORDER BY name ASC;',

  // Projects — LIMIT
  'SELECT * FROM projects LIMIT 2;',

  // Projects — combined
  "SELECT * FROM projects WHERE domain = 'VLSI' ORDER BY year DESC;",
  "SELECT * FROM projects WHERE featured = 'true' ORDER BY year DESC;",

  // Skills — by category
  "SELECT * FROM skills WHERE category = 'Languages';",
  "SELECT * FROM skills WHERE category = 'Systems';",
  "SELECT * FROM skills WHERE category = 'Hardware';",
  "SELECT * FROM skills WHERE category = 'Cloud';",
  "SELECT * FROM skills WHERE category = 'Tools';",

  // Skills — by name LIKE
  "SELECT * FROM skills WHERE name LIKE 'C';",
  "SELECT * FROM skills WHERE name LIKE 'VLSI';",
];

export default function QueryBar({ value, onChange, onExecute, state, history }: QueryBarProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSug, setActiveSug] = useState(-1);
  const [showHistory, setShowHistory] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  // Compute autocomplete suggestions
  useEffect(() => {
    if (!value.trim() || state === 'typing') { setSuggestions([]); return; }
    const lower = value.toLowerCase();
    const filtered = SUGGESTIONS.filter(s =>
      s.toLowerCase().startsWith(lower) && s.toLowerCase() !== lower
    );
    setSuggestions(filtered.slice(0, 5));
    setActiveSug(-1);
  }, [value, state]);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (activeSug >= 0 && suggestions[activeSug]) {
        onChange(suggestions[activeSug]);
        setSuggestions([]);
        setActiveSug(-1);
      } else {
        onExecute();
        setSuggestions([]);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSug(v => Math.min(v + 1, suggestions.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSug(v => Math.max(v - 1, -1));
    }
    if (e.key === 'Escape') {
      setSuggestions([]);
      setActiveSug(-1);
    }
    if (e.key === 'Tab' && suggestions.length) {
      e.preventDefault();
      const s = suggestions[activeSug >= 0 ? activeSug : 0];
      if (s) { onChange(s); setSuggestions([]); }
    }
  }

  const isExecuting = state === 'executing';
  const isTyping    = state === 'typing';

  return (
    <div className={`qb ${isExecuting ? 'qb--executing' : ''} ${isTyping ? 'qb--typing' : ''}`}>
      <div className="qb__bar">
        {/* Prompt symbol */}
        <span className="qb__prompt mono" aria-hidden="true">›</span>

        {/* Wrapper keeps highlight overlay and textarea in the same coordinate space */}
        <div className="qb__input-wrapper">
          {/* Highlighted display overlay */}
          <div className="qb__highlight" aria-hidden="true">
            {highlightSQL(value)}
            {/* Fake cursor when in typing state */}
            {isTyping && <span className="qb__fake-cursor" />}
          </div>

          {/* Real invisible textarea */}
          <textarea
            ref={inputRef}
            className="qb__input mono"
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKey}
            onFocus={() => history.length && setShowHistory(true)}
            onBlur={() => setTimeout(() => { setShowHistory(false); setSuggestions([]); }, 150)}
            placeholder="SELECT * FROM portfolio WHERE ..."
            rows={1}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Query input — enter SQL or plain English"
            aria-describedby="qb-hint"
            disabled={isTyping || isExecuting}
          />
        </div>

        {/* Run button */}
        <button
          className="qb__run"
          onClick={onExecute}
          disabled={isTyping || isExecuting || !value.trim()}
          aria-label="Execute query"
          title="Run query (Enter)"
        >
          {isExecuting ? (
            <span className="qb__spinner" aria-hidden="true" />
          ) : (
            <span className="qb__run-icon" aria-hidden="true">▶</span>
          )}
        </button>
      </div>

      {/* Execution progress bar */}
      {isExecuting && <div className="qb__progress" aria-hidden="true" />}

      {/* Hint */}
      <p id="qb-hint" className="qb__hint label">
        Press <kbd>Enter</kbd> to query · <kbd>Tab</kbd> to autocomplete · <kbd>↑↓</kbd> to navigate suggestions
      </p>

      {/* Autocomplete suggestions */}
      {suggestions.length > 0 && (
        <ul className="qb__suggestions" role="listbox" aria-label="Query suggestions">
          {suggestions.map((s, i) => (
            <li
              key={s}
              role="option"
              aria-selected={i === activeSug}
              className={`qb__suggestion mono ${i === activeSug ? 'is-active' : ''}`}
              onMouseDown={() => { onChange(s); setSuggestions([]); }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {/* History dropdown */}
      {showHistory && suggestions.length === 0 && history.length > 0 && (
        <div className="qb__history" aria-label="Recent queries">
          <p className="label qb__history-label">Recent</p>
          <ul>
            {history.map(h => (
              <li key={h}>
                <button
                  className="qb__history-item mono"
                  onMouseDown={() => { onChange(h); setShowHistory(false); }}
                >
                  {h}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
