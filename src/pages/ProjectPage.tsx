import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data';
import ArchitectureDiagram from '../components/project/ArchitectureDiagram';
import './ProjectPage.css';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <main className="project-page">
        <div className="container project-page__notfound">
          <p className="label project-page__err-label">Project Not Found</p>
          <h1 className="project-page__err-title">
            RELATION "{id?.toUpperCase()}" DOES NOT EXIST.
          </h1>
          <Link to="/" className="project-page__back-link">
            ← Return to portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="project-page">
      <div className="container">
        {/* ── Back nav ── */}
        <button
          className="project-page__back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ← Back
        </button>

        {/* ── Project header ── */}
        <header className="project-page__header" style={{ '--project-color': project.color } as React.CSSProperties}>
          <div className="project-page__header-inner">
            <div>
              <div className="project-page__meta-row">
                <span className="label project-page__domain" style={{ color: project.color }}>
                  {project.domain}
                </span>
                <span className="label project-page__year">{project.year}</span>
                <span className={`label project-page__status project-page__status--${project.status}`}>
                  {project.status}
                </span>
              </div>
              <h1 className="project-page__title">{project.name}</h1>
              <p className="project-page__tagline">{project.tagline}</p>
            </div>

            {/* External links */}
            <div className="project-page__links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-page__link-btn"
                  aria-label="View on GitHub"
                >
                  GitHub ↗
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-page__link-btn project-page__link-btn--primary"
                  aria-label="View live demo"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="project-page__description">{project.description}</p>

          {/* Tech stack */}
          <div className="project-page__tech-row">
            <span className="label project-page__tech-label">Stack</span>
            <div className="project-page__tags">
              {project.technologies.map(t => (
                <span key={t} className="project-page__tag mono">{t}</span>
              ))}
            </div>
          </div>
        </header>

        {/* ── Architecture section ── */}
        {project.architecture && project.architecture.length > 0 && (
          <section aria-labelledby="arch-heading" className="project-page__arch-section">
            <div className="project-page__arch-heading">
              <h2 id="arch-heading" className="project-page__section-title">
                System Architecture
              </h2>
              <p className="project-page__section-sub">
                Click any component to explore its role, inputs, outputs, and implementation.
              </p>
            </div>
            <ArchitectureDiagram
              nodes={project.architecture}
              projectName={project.name}
            />
          </section>
        )}

        {/* ── Footer CTA ── */}
        <footer className="project-page__footer">
          <Link to="/" className="project-page__home-link">
            ← Query more of Sarthak's work
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-page__footer-github"
            >
              View source on GitHub ↗
            </a>
          )}
        </footer>
      </div>
    </main>
  );
}
