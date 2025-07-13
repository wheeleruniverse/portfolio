export interface Planet {
  id: string
  name: string
  title: string
  description: string
  color: string
  size: number
  orbitRadius: number
  orbitSpeed: number
  startAngle: number
  icon: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credlyUrl?: string
  badge?: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  publishedAt: string
  url: string
  tags: string[]
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
  iconType?: 'svg' | 'emoji'
  label: string
}