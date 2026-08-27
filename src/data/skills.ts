// ============================================================
// SKILLS DATA
// ============================================================

import type { Skill } from './types';

export const skills: Skill[] = [
  // Languages
  { name: 'C++', category: 'Languages', relatedProjects: ['mini-sqlite'] },
  { name: 'C', category: 'Languages', relatedProjects: ['driftfusion-tinyml'] },
  { name: 'Java', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'SQL', category: 'Languages', relatedProjects: ['mini-sqlite'] },
  { name: 'TypeScript', category: 'Languages', relatedProjects: ['cloud-restaurant-system'] },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'Bash / Shell', category: 'Languages' },
  { name: 'Verilog', category: 'Languages', relatedProjects: ['9t-tcam'] },
  { name: 'Go', category: 'Languages' },

  // Database & Development
  { name: 'Spring Boot', category: 'Database & Development' },
  { name: 'REST APIs', category: 'Database & Development' },
  { name: 'Node.js / Express', category: 'Database & Development', relatedProjects: ['cloud-restaurant-system'] },
  { name: 'React', category: 'Database & Development', relatedProjects: ['cloud-restaurant-system'] },
  { name: 'PostgreSQL', category: 'Database & Development', relatedProjects: ['cloud-restaurant-system'] },
  { name: 'MySQL', category: 'Database & Development' },

  // Cloud & DevOps
  { name: 'AWS (IAM, EC2, RDS, S3)', category: 'Cloud & DevOps', relatedProjects: ['cloud-restaurant-system'] },
  { name: 'Cloud Architecture', category: 'Cloud & DevOps' },
  { name: 'Distributed Systems', category: 'Cloud & DevOps' },
  { name: 'Docker', category: 'Cloud & DevOps' },
  { name: 'Go (Golang)', category: 'Cloud & DevOps' },

  // Embedded & IoT
  { name: 'Embedded Systems', category: 'Embedded & IoT', relatedProjects: ['driftfusion-tinyml'] },
  { name: 'TinyML', category: 'Embedded & IoT', relatedProjects: ['driftfusion-tinyml'] },
  { name: 'Embedded ML', category: 'Embedded & IoT' },
  { name: 'ESP32 (Family)', category: 'Embedded & IoT', relatedProjects: ['driftfusion-tinyml'] },
  { name: 'Arduino (Family)', category: 'Embedded & IoT' },
  { name: 'Raspberry Pi', category: 'Embedded & IoT' },
  { name: 'I2C', category: 'Embedded & IoT' },
  { name: 'SPI', category: 'Embedded & IoT' },
  { name: 'UART', category: 'Embedded & IoT' },

  // Tools
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'Linux', category: 'Tools' },
  { name: 'Docker', category: 'Tools' },
  { name: 'MATLAB', category: 'Tools', relatedProjects: ['ultrasound-radar'] },

  // Areas of Interest
  { name: 'DevOps', category: 'Areas of Interest' },
  { name: 'Cloud Computing & Security', category: 'Areas of Interest' },
  { name: 'Cyber Security', category: 'Areas of Interest' },
  { name: 'IoT', category: 'Areas of Interest' },
  { name: 'Embedded Systems', category: 'Areas of Interest' },
  { name: 'Cloud Infrastructure', category: 'Areas of Interest' },
  { name: 'Distributed Systems', category: 'Areas of Interest' }
];

export const skillCategories = [
  'Languages',
  'Database & Development',
  'Cloud & DevOps',
  'Embedded & IoT',
  'Tools',
  'Areas of Interest'
];
