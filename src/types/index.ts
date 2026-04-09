// src/types/index.ts

export type ProjectCategory = 'WEBSITE' | 'UIUX' | 'DATA_ANALYSIS' | 'GRAPHIC_DESIGN';
export type SkillCategory = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DESIGN' | 'DATA' | 'DEVOPS' | 'OTHER';

export interface Hero {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  avatarUrl?: string | null;
  resumeUrl?: string | null;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description: string;
  technologies: string[];
  logoUrl?: string | null;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  tags: string[];
  category: ProjectCategory;
  featured: boolean;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: SkillCategory;
  icon?: string | null;
  order: number;
}

export interface Contact {
  id: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  dribbble?: string | null;
  behance?: string | null;
}
