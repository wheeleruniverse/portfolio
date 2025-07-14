<template>
  <div class="projects-planet">
    <section class="section-hero">
      <div class="hero-content">
        <h2 class="section-title">Projects & Portfolio</h2>
        <p class="hero-description">
          A collection of projects showcasing my technical skills and
          problem-solving abilities across different domains.
        </p>
      </div>
    </section>

    <section class="featured-projects">
      <h3 class="subsection-title">Featured Projects</h3>
      <div class="projects-grid">
        <div
          v-for="project in featuredProjects"
          :key="project.id"
          :id="`project-${project.id}`"
          class="project-card featured"
          :class="{ highlighted: highlightedProject === project.id }"
        >
          <div class="project-image" v-if="project.image">
            <img :src="project.image" :alt="project.name" />
          </div>
          <div class="project-placeholder" v-else>
            <div class="placeholder-icon">🚀</div>
          </div>
          <div class="project-content">
            <h4 class="project-title">{{ project.name }}</h4>
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
              :id="`project-${project.id}`"
              class="mini-project"
              :class="{ highlighted: highlightedProject === project.id }"
            >
              <div class="mini-project-header">
                <h5 class="mini-project-title">{{ project.name }}</h5>
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

    <section class="project-highlights">
      <h3 class="subsection-title">Project Highlights</h3>
      <div class="highlights-grid">
        <div class="highlight-card">
          <div class="highlight-icon">🏆</div>
          <h4 class="highlight-title">Wheeler Recommends</h4>
          <p class="highlight-description">
            Personal recommendation engine for books, movies, and resources with
            AI-powered suggestions.
          </p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">☁️</div>
          <h4 class="highlight-title">Cloud Architecture Templates</h4>
          <p class="highlight-description">
            Reusable AWS CloudFormation and CDK templates for common
            architectural patterns.
          </p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">🤖</div>
          <h4 class="highlight-title">DevOps Automation Tools</h4>
          <p class="highlight-description">
            Custom tools and scripts for automating deployment, monitoring, and
            maintenance tasks.
          </p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">📚</div>
          <h4 class="highlight-title">Learning Resources Hub</h4>
          <p class="highlight-description">
            Curated collection of technical resources, tutorials, and guides for
            developers.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types';
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

interface Config {
  projects: Project[];
}

const route = useRoute();
const config = ref<Config | null>(null);
const featuredProjects = ref<Project[]>([]);
const highlightedProject = ref<string | null>(null);

const loadConfig = async () => {
  try {
    const response = await fetch('/portfolio-config.json');
    const data = await response.json();
    config.value = data;

    // Filter featured projects
    featuredProjects.value =
      data.projects?.filter((project: Project) => project.featured) || [];

    // Check if we need to highlight a specific project
    const projectId = route.query.project as string;
    if (projectId) {
      highlightedProject.value = projectId;
      await nextTick();
      scrollToProject(projectId);
    }
  } catch (error) {
    console.error('Error loading portfolio config:', error);
  }
};

const scrollToProject = (projectId: string) => {
  const element = document.getElementById(`project-${projectId}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Clear highlight after a few seconds
    setTimeout(() => {
      highlightedProject.value = null;
    }, 3000);
  }
};

const projectCategories = ref([
  {
    name: 'Web Applications',
    icon: '🌐',
    description:
      'Full-stack web applications with modern frameworks and cloud deployment',
    projects: [] as Project[],
  },
  {
    name: 'Data Engineering',
    icon: '📊',
    description: 'Data processing, ETL pipelines, and analytics solutions',
    projects: [] as Project[],
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    description:
      'Infrastructure as code, automation tools, and cloud solutions',
    projects: [] as Project[],
  },
]);

const updateProjectCategories = () => {
  if (!config.value?.projects) return;

  const webProjects = config.value.projects.filter(p => p.category === 'web');
  const dataProjects = config.value.projects.filter(p => p.category === 'data');
  const cloudProjects = config.value.projects.filter(
    p => p.category === 'cloud'
  );

  projectCategories.value[0].projects = webProjects;
  projectCategories.value[1].projects = dataProjects;
  projectCategories.value[2].projects = cloudProjects;
};

onMounted(() => {
  loadConfig().then(() => {
    updateProjectCategories();
  });
});
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
.project-highlights {
  margin-bottom: 4rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffd700;
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

.project-card.highlighted {
  border-color: rgba(255, 215, 0, 0.8);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  animation: pulse-highlight 2s ease-in-out;
}

@keyframes pulse-highlight {
  0% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
  }
  100% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  }
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
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
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
  color: #ffd700;
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
  color: #0ea5e9;
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
  background: #22c55e;
  color: white;
}

.project-link.live:hover {
  background: #16a34a;
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
  color: #ffd700;
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
  border-left: 3px solid #0ea5e9;
}

.mini-project.highlighted {
  border-left-color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
  animation: pulse-highlight 2s ease-in-out;
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
  color: #0ea5e9;
  text-decoration: none;
  font-size: 1rem;
}

.mini-link:hover {
  color: #0284c7;
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
  color: #0ea5e9;
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
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
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
  color: #ffd700;
  font-family: 'Orbitron', monospace;
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 0.25rem;
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
  color: #ffd700;
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
