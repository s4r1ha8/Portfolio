// ============================================================
// DATA TYPES — Portfolio Data Model
// ============================================================

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  technologies: string[];
  status: 'active' | 'complete' | 'research' | 'in-progress';
  featured: boolean;
  github?: string;
  demo?: string;
  architecture?: ArchitectureNode[];
  year?: string;
  color: string; // accent color for the card
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  status: 'implemented' | 'partial' | 'planned' | 'in-process';
  responsibility: string;
  input?: string;
  output?: string;
  technologies: string[];
  explanation: string;
  codeSnippet?: string;
}

export interface Skill {
  name: string;
  category: string;
  relatedProjects?: string[];
}

export interface ExperienceRecord {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'full-time' | 'intern' | 'research' | 'freelance' | 'academic';
  description: string;
  highlights: string[];
  skills: string[];
}

export interface AboutData {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  focus: string[];
  currentDirection: string;
  location?: string;
  education: string;
}

export interface ContactRecord {
  type: string;
  label: string;
  value: string;
  url: string;
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  level: string;
  issuer: string;
  issuedDate: string;
  validationNumber: string;
  verificationUrl: string;
  credlyUrl?: string;
  skills: string[];
  domain: string;
  status: 'active' | 'expired';
  badgeColor: string;
}