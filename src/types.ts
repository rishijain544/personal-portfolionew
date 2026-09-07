export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  techStack: string[];
  animationStyle: '3d-mri' | 'laser-scan' | 'flashcard-flip' | 'ml-sliders' | 'heatmap-grid' | 'fintech-fraud';
  highlights: string[];
  metrics: { label: string; value: string; detail: string }[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  badgeStyle: 'azure-blue' | 'aws-amber' | 'tata-gradient';
  iconName: string;
  skills: string[];
  date: string;
  credentialUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  techUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; icon?: string; highlighted?: boolean }[];
}
