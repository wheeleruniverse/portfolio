export interface Planet {
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  vendor: string;
  level: 'Professional' | 'Specialty' | 'Associate' | 'Foundational';
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credlyUrl?: string;
  badge?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
  category?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  duration?: string;
  location?: string;
  client?: string;
  manager?: string;
  role?: string;
  project?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  location?: string;
  icon?: string;
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  url: string;
  tags: string[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  iconType?: 'svg' | 'emoji';
  label: string;
}
