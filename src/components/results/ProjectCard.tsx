import React from 'react';
import type { Project } from '../../data/types';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const STATUS_LABELS: Record<Project['status'], string> = {
  'active': 'Active',
  'complete': 'Complete',
  'research': 'Research',
  'in-progress': 'In Progress',
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const navigate = useNavigate();
  const hasArchitecture = project.architecture && project.architecture.length > 0;

  return (
    <article
      className="project-card"
      style={{ animationDelay: `${index * 80}ms`, '--card-color': project.color } as React.CSSProperties}
    >
      <div className="project-card__accent-bar" />

      <div className="project-card__header">
        <span className="project-card__index mono label">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {project.year && (
            <span className="project-card__index mono label">{project.year}</span>
          )}
          <span className={`project-card__status label project-card__status--${project.status}`}>
            {STATUS_LABELS[project.status]}
          </span>
        </div>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <span className="project-card__domain-pill">{project.domain}</span>
      </div>

      <div className="project-card__tech">
        {project.technologies.slice(0, 4).map(t => (
          <span key={t} className="project-card__tag mono">{t}</span>
        ))}
        {project.technologies.length > 4 && (
          <span className="project-card__tag project-card__tag--more">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>

      <div className="project-card__actions">
        {hasArchitecture && (
          <button
            className="project-card__cta"
            onClick={() => navigate(`/projects/${project.id}`)}
            aria-label={`View ${project.name} system architecture`}
          >
            View System →
          </button>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link"
            aria-label={`${project.name} on GitHub`}
          >
            GitHub ↗
          </a>
        )}
      </div>
    </article>
  );
}
