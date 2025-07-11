<template>
  <div class="projects-planet">
    <section class="section-hero">
      <div class="hero-content">
        <h2 class="section-title">Projects & Portfolio</h2>
        <p class="hero-description">
          A collection of projects showcasing my technical skills and problem-solving abilities across different domains.
        </p>
      </div>
    </section>

    <section class="featured-projects">
      <h3 class="subsection-title">Featured Projects</h3>
      <div class="projects-grid">
        <div
          v-for="project in featuredProjects"
          :key="project.id"
          class="project-card featured"
        >
          <div class="project-image" v-if="project.image">
            <img :src="project.image" :alt="project.title" />
          </div>
          <div class="project-placeholder" v-else>
            <div class="placeholder-icon">🚀</div>
          </div>
          <div class="project-content">
            <h4 class="project-title">{{ project.title }}</h4>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="tech-badge"
              >
                {{ tech }}
              </span>
            </div>
            <div class="project-links">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                class="project-link live"
                target="_blank"
                rel="noopener noreferrer"
              >
                🌐 Live Demo
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                class="project-link github"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="project-categories">
      <h3 class="subsection-title">Project Categories</h3>
      <div class="categories-grid">
        <div
          v-for="category in projectCategories"
          :key="category.name"
          class="category-card"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <h4 class="category-title">{{ category.name }}</h4>
          <p class="category-description">{{ category.description }}</p>
          <div class="category-projects">
            <div
              v-for="project in category.projects"
              :key="project.id"
              class="mini-project"
            >
              <div class="mini-project-header">
                <h5 class="mini-project-title">{{ project.title }}</h5>
                <div class="mini-project-links">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    class="mini-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🌐
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    class="mini-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗
                  </a>
                </div>
              </div>
              <p class="mini-project-description">{{ project.description }}</p>
              <div class="mini-project-tech">
                <span
                  v-for="tech in project.technologies.slice(0, 3)"
                  :key="tech"
                  class="mini-tech-badge"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="github-stats">
      <h3 class="subsection-title">GitHub Activity</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-number">50+</div>
            <div class="stat-label">Public Repositories</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <div class="stat-number">200+</div>
            <div class="stat-label">Stars Earned</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔀</div>
          <div class="stat-content">
            <div class="stat-number">100+</div>
            <div class="stat-label">Contributions</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🌟</div>
          <div class="stat-content">
            <div class="stat-number">15+</div>
            <div class="stat-label">Languages</div>
          </div>
        </div>
      </div>
    </section>

    <section class="open-source">
      <h3 class="subsection-title">Open Source Contributions</h3>
      <div class="open-source-grid">
        <div
          v-for="contribution in openSourceContributions"
          :key="contribution.project"
          class="contribution-card"
        >
          <div class="contribution-header">
            <h4 class="contribution-project">{{ contribution.project }}</h4>
            <div class="contribution-type">{{ contribution.type }}</div>
          </div>
          <p class="contribution-description">{{ contribution.description }}</p>
          <div class="contribution-impact">
            <span class="impact-label">Impact:</span>
            <span class="impact-text">{{ contribution.impact }}</span>
          </div>
          <div class="contribution-tech">
            <span
              v-for="tech in contribution.technologies"
              :key="tech"
              class="tech-badge small"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="project-highlights">
      <h3 class="subsection-title">Project Highlights</h3>
      <div class="highlights-grid">
        <div class="highlight-card">
          <div class="highlight-icon">🏆</div>
          <h4 class="highlight-title">Wheeler Recommends</h4>
          <p class="highlight-description">
            Personal recommendation engine for books, movies, and resources with AI-powered suggestions.
          </p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">☁️</div>
          <h4 class="highlight-title">Cloud Architecture Templates</h4>
          <p class="highlight-description">
            Reusable AWS CloudFormation and CDK templates for common architectural patterns.
          </p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">🤖</div>
          <h4 class="highlight-title">DevOps Automation Tools</h4>
          <p class="highlight-description">
            Custom tools and scripts for automating deployment, monitoring, and maintenance tasks.
          </p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">📚</div>
          <h4 class="highlight-title">Learning Resources Hub</h4>
          <p class="highlight-description">
            Curated collection of technical resources, tutorials, and guides for developers.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '@/types'

const featuredProjects = ref<Project[]>([
  {
    id: 'wheeler-recommends',
    title: 'Wheeler Recommends',
    description: 'Personal recommendation platform featuring curated lists of books, movies, and technical resources with AI-powered suggestions and user ratings.',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'OpenAI API', 'AWS Lambda', 'Docker'],
    githubUrl: 'https://github.com/justinwheeler/wheeler-recommends',
    liveUrl: 'https://wheeler-recommends.com',
    image: undefined
  },
  {
    id: 'cloud-architecture-templates',
    title: 'Cloud Architecture Templates',
    description: 'Comprehensive collection of AWS CloudFormation and CDK templates for common architectural patterns including serverless, microservices, and multi-tier applications.',
    technologies: ['AWS CDK', 'TypeScript', 'CloudFormation', 'AWS Lambda', 'API Gateway', 'DynamoDB'],
    githubUrl: 'https://github.com/justinwheeler/cloud-templates',
    liveUrl: undefined,
    image: undefined
  },
  {
    id: 'portfolio-website',
    title: 'Wheeler Universe Portfolio',
    description: 'This interactive space-themed portfolio website built with Vue 3, featuring a solar system navigation and responsive design.',
    technologies: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'GSAP', 'CSS Animations'],
    githubUrl: 'https://github.com/justinwheeler/wheeler-universe-portfolio',
    liveUrl: 'https://wheeleruniverse.com',
    image: undefined
  }
])

const projectCategories = ref([
  {
    name: 'Web Applications',
    icon: '🌐',
    description: 'Full-stack web applications with modern frameworks and cloud deployment',
    projects: [
      {
        id: 'task-manager',
        title: 'Task Management App',
        description: 'Collaborative task management with real-time updates',
        technologies: ['Vue.js', 'Node.js', 'Socket.io', 'MongoDB'],
        githubUrl: 'https://github.com/justinwheeler/task-manager',
        liveUrl: undefined
      },
      {
        id: 'blog-platform',
        title: 'Personal Blog Platform',
        description: 'Custom blog platform with markdown support and SEO optimization',
        technologies: ['Nuxt.js', 'Netlify CMS', 'Tailwind CSS'],
        githubUrl: 'https://github.com/justinwheeler/blog-platform',
        liveUrl: 'https://wheeleruniverse.netlify.app'
      },
      {
        id: 'weather-app',
        title: 'Weather Dashboard',
        description: 'Real-time weather data with location-based forecasts',
        technologies: ['React', 'OpenWeatherMap API', 'Chart.js'],
        githubUrl: 'https://github.com/justinwheeler/weather-dashboard',
        liveUrl: undefined
      }
    ]
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    description: 'Infrastructure as code, automation tools, and cloud solutions',
    projects: [
      {
        id: 'terraform-modules',
        title: 'Terraform Modules',
        description: 'Reusable Terraform modules for AWS infrastructure',
        technologies: ['Terraform', 'AWS', 'HCL', 'Bash'],
        githubUrl: 'https://github.com/justinwheeler/terraform-modules',
        liveUrl: undefined
      },
      {
        id: 'ci-cd-pipeline',
        title: 'CI/CD Pipeline Templates',
        description: 'GitLab CI and GitHub Actions templates for various project types',
        technologies: ['GitLab CI', 'GitHub Actions', 'Docker', 'Kubernetes'],
        githubUrl: 'https://github.com/justinwheeler/cicd-templates',
        liveUrl: undefined
      },
      {
        id: 'monitoring-stack',
        title: 'Monitoring Stack',
        description: 'Complete monitoring solution with Prometheus and Grafana',
        technologies: ['Prometheus', 'Grafana', 'AlertManager', 'Docker'],
        githubUrl: 'https://github.com/justinwheeler/monitoring-stack',
        liveUrl: undefined
      }
    ]
  },
  {
    name: 'Tools & Utilities',
    icon: '🔧',
    description: 'Developer tools, CLIs, and automation scripts',
    projects: [
      {
        id: 'aws-cli-helper',
        title: 'AWS CLI Helper',
        description: 'Utility scripts for common AWS CLI operations',
        technologies: ['Python', 'AWS CLI', 'Boto3', 'Click'],
        githubUrl: 'https://github.com/justinwheeler/aws-cli-helper',
        liveUrl: undefined
      },
      {
        id: 'docker-compose-generator',
        title: 'Docker Compose Generator',
        description: 'Interactive CLI tool for generating Docker Compose files',
        technologies: ['Node.js', 'Inquirer.js', 'YAML', 'CLI'],
        githubUrl: 'https://github.com/justinwheeler/docker-compose-gen',
        liveUrl: undefined
      },
      {
        id: 'git-workflow-tools',
        title: 'Git Workflow Tools',
        description: 'Collection of Git hooks and workflow automation scripts',
        technologies: ['Bash', 'Git', 'Python', 'JSON'],
        githubUrl: 'https://github.com/justinwheeler/git-workflow-tools',
        liveUrl: undefined
      }
    ]
  }
])

const openSourceContributions = ref([
  {
    project: 'Vue.js Ecosystem',
    type: 'Bug Fixes',
    description: 'Contributed bug fixes and improvements to Vue.js ecosystem packages',
    impact: 'Fixed issues affecting thousands of developers',
    technologies: ['Vue.js', 'TypeScript', 'JavaScript']
  },
  {
    project: 'AWS CDK Community',
    type: 'Documentation',
    description: 'Improved documentation and examples for AWS CDK constructs',
    impact: 'Enhanced developer experience for cloud infrastructure',
    technologies: ['AWS CDK', 'TypeScript', 'Markdown']
  },
  {
    project: 'Open Source Security',
    type: 'Security Patches',
    description: 'Identified and patched security vulnerabilities in popular packages',
    impact: 'Improved security for applications using these packages',
    technologies: ['Node.js', 'Security Analysis', 'Various']
  }
])
</script>

<style scoped>
.projects-planet {
  max-width: 1200px;
  margin: 0 auto;
}

.section-hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero-description {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.featured-projects,
.project-categories,
.github-stats,
.open-source,
.project-highlights {
  margin-bottom: 4rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #FFD700;
  margin-bottom: 2rem;
  font-family: 'Orbitron', monospace;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.project-card {
  @apply planet-card;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(14, 165, 233, 0.3);
}

.project-card.featured {
  border-color: rgba(14, 165, 233, 0.5);
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-placeholder {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #0EA5E9, #0284C7);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.placeholder-icon {
  font-size: 4rem;
  color: white;
}

.project-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #FFD700;
  margin-bottom: 0.75rem;
  font-family: 'Orbitron', monospace;
}

.project-description {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-badge {
  background: rgba(14, 165, 233, 0.2);
  color: #0EA5E9;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.tech-badge.small {
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.project-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.project-link.live {
  background: #22C55E;
  color: white;
}

.project-link.live:hover {
  background: #16A34A;
  transform: translateY(-2px);
}

.project-link.github {
  background: rgba(255, 255, 255, 0.1);
  color: #ccc;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.project-link.github:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.category-card {
  @apply planet-card;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(14, 165, 233, 0.2);
}

.category-icon {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.category-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #FFD700;
  margin-bottom: 0.5rem;
  text-align: center;
}

.category-description {
  color: #ccc;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.category-projects {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mini-project {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 3px solid #0EA5E9;
}

.mini-project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.mini-project-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.mini-project-links {
  display: flex;
  gap: 0.5rem;
}

.mini-link {
  color: #0EA5E9;
  text-decoration: none;
  font-size: 1rem;
}

.mini-link:hover {
  color: #0284C7;
}

.mini-project-description {
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.mini-project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.mini-tech-badge {
  background: rgba(14, 165, 233, 0.2);
  color: #0EA5E9;
  padding: 0.15rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.7rem;
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  @apply planet-card;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(14, 165, 233, 0.2);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0EA5E9, #0284C7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #FFD700;
  font-family: 'Orbitron', monospace;
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 0.25rem;
}

.open-source-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.contribution-card {
  @apply planet-card;
  transition: all 0.3s ease;
}

.contribution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(14, 165, 233, 0.2);
}

.contribution-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.contribution-project {
  font-size: 1.1rem;
  font-weight: 600;
  color: #FFD700;
}

.contribution-type {
  background: rgba(14, 165, 233, 0.2);
  color: #0EA5E9;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.contribution-description {
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.contribution-impact {
  margin-bottom: 1rem;
}

.impact-label {
  font-weight: 600;
  color: white;
  margin-right: 0.5rem;
}

.impact-text {
  color: #ccc;
  font-size: 0.9rem;
}

.contribution-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.highlight-card {
  @apply planet-card;
  text-align: center;
  transition: all 0.3s ease;
}

.highlight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(14, 165, 233, 0.2);
}

.highlight-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.highlight-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #FFD700;
  margin-bottom: 0.5rem;
}

.highlight-description {
  color: #ccc;
  line-height: 1.5;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
  }
  
  .highlights-grid {
    grid-template-columns: 1fr;
  }
  
  .project-links {
    flex-direction: column;
  }
  
  .mini-project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>