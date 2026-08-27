
import React, { useState, useEffect } from 'react';
import type { QueryResult } from '../../engine/types';
import type { Project, Skill, AboutData, ContactRecord, Certification } from '../../data/types';
import ProjectCard from './ProjectCard';
import './ResultsPanel.css';

// ── Syntax-highlighted query display ─────────────────────────

function HighlightedQuery({ query }: { query: string }) {
  // Tokenise the query string with simple regex highlighting
  const parts = query.split(
    /(SELECT|FROM|WHERE|AND|OR|ORDER\s+BY|LIMIT|ASC|DESC|LIKE|INSERT|UPDATE|DELETE)/gi
  );

  return (
    <code className="results-panel__query-tokens mono">
      {parts.map((part, i) => {
        const upper = part.trim().toUpperCase().replace(/\s+/, ' ');
        if (['SELECT','FROM','WHERE','AND','OR','ORDER BY','LIMIT','ASC','DESC','LIKE'].includes(upper)) {
          return <span key={i} className="hl-keyword">{part}</span>;
        }
        // String literals 'value'
        if (/^'[^']*'$/.test(part.trim())) {
          return <span key={i} className="hl-string">{part}</span>;
        }
        // Operators = != > <
        if (/^[=!<>]+$/.test(part.trim())) {
          return <span key={i} className="hl-operator">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </code>
  );
}

// ── Sub-renderers ────────────────────────────────────────────

function ProjectsResult({ data }: { data: Project[] }) {
  if (!data.length) return <EmptyState table="projects" />;
  return (
    <div className="results-grid results-grid--projects">
      {data.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
    </div>
  );
}

function SkillsResult({ data }: { data: Skill[] }) {
  // Group by category
  const grouped = data.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="skills-result">
      {Object.entries(grouped).map(([cat, skills], gi) => (
        <div key={cat} className="skills-result__group" style={{ animationDelay: `${gi * 60}ms` }}>
          <h4 className="skills-result__category label">{cat}</h4>
          <div className="skills-result__chips">
            {skills.map(s => (
              <span key={s.name} className="skills-result__chip mono">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AboutResult({ data }: { data: AboutData }) {
  return (
    <div className="about-result">
      <div className="about-result__card">
        <div className="about-result__header">
          <div className="about-result__avatar" aria-hidden="true">
            {data.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="about-result__name">{data.name}</h3>
            <p className="about-result__title label">{data.title}</p>
          </div>
        </div>

        <blockquote className="about-result__tagline">"{data.tagline}"</blockquote>

        <p className="about-result__summary">{data.summary}</p>

        <div className="about-result__focus">
          <h4 className="label">Focus Areas</h4>
          <ul>
            {data.focus.map(f => (
              <li key={f} className="about-result__focus-item">
                <span className="about-result__focus-bullet" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-result__meta">
          {data.location && (
            <div className="about-result__meta-row">
              <span className="label">Location</span>
              <span>{data.location}</span>
            </div>
          )}
          <div className="about-result__meta-row">
            <span className="label">Education</span>
            <span>{data.education}</span>
          </div>
          <div className="about-result__meta-row">
            <span className="label">Currently</span>
            <span>{data.currentDirection}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactResult({ data }: { data: ContactRecord[] }) {
  const ICONS: Record<string, string> = {
    github: '⌥',
    linkedin: '∟',
    email: '✉',
  };

  return (
    <div className="contact-result">
      <p className="contact-result__intro">
        Available for new opportunities, collaborations, and interesting problems.
      </p>
      <div className="contact-result__cards">
        {data.map((c, i) => (
          <a
            key={c.type}
            href={c.url}
            target={c.type !== 'email' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="contact-result__card"
            style={{ animationDelay: `${i * 80}ms` }}
            aria-label={`Contact via ${c.label}: ${c.value}`}
          >
            <span className="contact-result__icon" aria-hidden="true">
              {ICONS[c.type] ?? '→'}
            </span>
            <div>
              <p className="contact-result__label label">{c.label}</p>
              <p className="contact-result__value">{c.value}</p>
            </div>
            <span className="contact-result__arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function QueryError({ error }: { error: { message: string; hint?: string } }) {
  return (
    <div className="query-error" role="alert">
      <div className="query-error__icon" aria-hidden="true">⚠</div>
      <div>
        <p className="query-error__title label">Query Error</p>
        <p className="query-error__message mono">{error.message}</p>
        {error.hint && <p className="query-error__hint">{error.hint}</p>}
        <div className="query-error__suggestions">
          <p className="label">Try:</p>
          <div className="query-error__chips">
            {['SELECT * FROM projects;', 'SELECT * FROM skills;', 'SELECT * FROM about;', 'SELECT * FROM contact;', 'SELECT * FROM certifications;'].map(q => (
              <code key={q} className="query-error__chip mono">{q}</code>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificationResult({ data }: { data: Certification[] }) {
  return (
    <div className="cert-result">
      {data.map((cert, i) => (
        <article key={cert.id} className="cert-result__card" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="cert-result__header">
            {/* AWS-style hexagon badge */}
            <div className="cert-result__badge" aria-label={`${cert.name} badge`}>
              <svg viewBox="0 0 120 138" xmlns="http://www.w3.org/2000/svg" className="cert-result__badge-hex">
                <defs>
                  <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4a90e8"/>
                    <stop offset="100%" stopColor="#2255cc"/>
                  </linearGradient>
                </defs>
                <polygon points="60,4 116,34 116,104 60,134 4,104 4,34" fill="url(#hexGrad)" stroke="#7ab8f5" strokeWidth="3"/>
                <text x="60" y="38" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="system-ui">aws</text>
                <text x="60" y="52" textAnchor="middle" fill="#c8dff8" fontSize="9" fontFamily="system-ui">certified</text>
                <line x1="20" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                <text x="60" y="78" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="system-ui">Solutions</text>
                <text x="60" y="93" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="system-ui">Architect</text>
                <line x1="20" y1="101" x2="100" y2="101" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                <text x="60" y="117" textAnchor="middle" fill="#c8dff8" fontSize="9" letterSpacing="2" fontFamily="system-ui">ASSOCIATE</text>
              </svg>
            </div>
            <div className="cert-result__info">
              <h3 className="cert-result__name">{cert.name}</h3>
              <p className="cert-result__level label">{cert.level}</p>
              <p className="cert-result__issuer">{cert.issuer}</p>
              <div className="cert-result__meta-row">
                <span className="cert-result__status-badge label cert-result__status--active">✓ {cert.status.toUpperCase()}</span>
                <span className="cert-result__year label">{cert.issuedDate}</span>
              </div>
            </div>
          </div>

          <div className="cert-result__details">
            <div className="cert-result__detail-row">
              <span className="label">Validation ID</span>
              <code className="cert-result__validation mono">{cert.validationNumber}</code>
            </div>
            <div className="cert-result__detail-row">
              <span className="label">Verify at</span>
              <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="cert-result__verify-link mono">
                {cert.verificationUrl} ↗
              </a>
            </div>
          </div>

          <div className="cert-result__skills">
            <p className="label cert-result__skills-label">Domains Covered</p>
            <div className="cert-result__chips">
              {cert.skills.map(s => (
                <span key={s} className="cert-result__chip mono">{s}</span>
              ))}
              <span className="cert-result__chip cert-result__chip--more mono">& much more</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function EmptyState({ table }: { table: string }) {
  return (
    <div className="empty-state">
      <p className="empty-state__title label">No Records Found</p>
      <p className="empty-state__desc">No matching records in <code className="mono">{table}</code></p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading-state" aria-live="polite" aria-label="Query executing">
      <div className="loading-state__dots">
        {[0, 1, 2].map(i => (
          <span key={i} className="loading-state__dot" style={{ animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
      <p className="label">Querying...</p>
    </div>
  );
}

// ── Main Results Panel ────────────────────────────────────────

interface ResultsPanelProps {
  result: QueryResult | null;
  isExecuting: boolean;
  onClose?: () => void;
}

export default function ResultsPanel({ result, isExecuting, onClose }: ResultsPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Reset states when a new result comes in
  useEffect(() => {
    setIsMinimized(false);
    setIsMaximized(false);
  }, [result]);
  if (isExecuting) return (
    <section className="results-panel" aria-live="polite">
      <LoadingState />
    </section>
  );

  if (!result) return null;

  const count = result.count ?? 0;
  const execTime = result.executionTimeMs;

  return (
    <section 
      className={`results-panel ${isMaximized ? 'results-panel--maximized' : ''} ${isMinimized ? 'results-panel--minimized' : ''}`} 
      aria-live="polite" 
      aria-label="Query results"
    >
      {/* Terminal-style result header */}
      {result.type !== 'error' && (
        <div className="results-panel__terminal">
          <div className="results-panel__terminal-bar">
            <div className="results-panel__terminal-dots" aria-hidden="true">
              <span 
                className="results-panel__dot-close" 
                onClick={onClose} 
                title="Close"
              />
              <span 
                className="results-panel__dot-minimize" 
                onClick={() => setIsMinimized(!isMinimized)} 
                title={isMinimized ? "Restore" : "Minimize"}
              />
              <span 
                className="results-panel__dot-maximize" 
                onClick={() => setIsMaximized(!isMaximized)} 
                title={isMaximized ? "Restore" : "Maximize"}
              />
            </div>
            <span className="results-panel__terminal-label mono">mysql&gt;</span>
          </div>
          <HighlightedQuery query={result.query} />
          <div className="results-panel__terminal-footer">
            <span className="results-panel__ok mono">✓ Query OK</span>
            <span className="results-panel__meta-right mono">
              {count} {count === 1 ? 'row' : 'rows'} returned
              {execTime !== undefined && ` · ${execTime}ms`}
            </span>
          </div>
        </div>
      )}

      {/* Result body */}
      <div className="results-panel__body">
        {result.type === 'projects' && (
          <ProjectsResult data={result.data as Project[]} />
        )}
        {result.type === 'skills' && (
          <SkillsResult data={result.data as Skill[]} />
        )}

        {result.type === 'about' && (
          <AboutResult data={result.data as AboutData} />
        )}
        {result.type === 'contact' && (
          <ContactResult data={result.data as ContactRecord[]} />
        )}
        {result.type === 'certifications' && (
          <CertificationResult data={result.data as Certification[]} />
        )}
        {result.type === 'error' && result.error && (
          <QueryError error={result.error} />
        )}
        {result.type === 'empty' && (
          <EmptyState table="unknown" />
        )}
      </div>
    </section>
  );
}
