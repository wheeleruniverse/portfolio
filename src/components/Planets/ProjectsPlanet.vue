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
          <div class="project-image" v-if="getProjectMedia(project)">
            <video
              v-if="isVideo(getProjectMedia(project))"
              :src="getProjectMedia(project)"
              autoplay
              loop
              muted
              playsinline
              @error="handleMediaError(project)"
            />
            <img
              v-else
              :src="getProjectMedia(project)"
              :alt="project.name"
              @error="handleMediaError(project)"
            />
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
      
      <!-- Web Applications and Data Engineering (stacked) -->
      <div class="web-data-categories">
        <div
          v-for="category in webDataCategories"
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
      
      <!-- Cloud & DevOps (separate) -->
      <div class="cloud-categories">
        <div
          v-for="category in cloudCategories"
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

    <section class="project-highlights">
      <h3 class="subsection-title">Project Highlights</h3>
      <div class="highlights-grid">
        <div class="highlight-card">
          <div class="highlight-icon">🏆</div>
          <h4 class="highlight-title">Wheeler Recommends</h4>
          <p class="highlight-description">
            Machine learning recommendation engine for movies based on public
            IMDB data.
          </p>
        </div>
        <div class="highlight-card">
          <div class="highlight-icon">☁️</div>
          <h4 class="highlight-title">Cloud Templates</h4>
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

  <ReturnToSolarSystem />
</template>

<script setup lang="ts">
import ReturnToSolarSystem from '@/components/Navigation/ReturnToSolarSystem.vue';
import { usePortfolioConfig } from '@/composables/usePortfolioConfig';
import type { Project } from '@/types';
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { config } = usePortfolioConfig();
const featuredProjects = ref<Project[]>([]);
const highlightedProject = ref<string | null>(null);
const projectMediaCache = ref<Map<string, string>>(new Map());
const ALLOWED_EXTENSIONS = ['png', 'mp4'] as const;

const loadConfig = async () => {
  // Filter featured projects
  featuredProjects.value =
    config.value?.projects?.filter((project: Project) => project.featured) ||
    [];

  // Check if we need to highlight a specific project
  const projectId = route.query.project as string;
  if (projectId) {
    highlightedProject.value = projectId;
    await nextTick();
    scrollToProject(projectId);
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

const getProjectMedia = (project: Project): string | undefined => {
  // Check cache first
  if (projectMediaCache.value.has(project.id)) {
    return projectMediaCache.value.get(project.id) || undefined;
  }

  // If project already has an image, use it
  if (project.image) {
    projectMediaCache.value.set(project.id, project.image);
    return project.image;
  }

  // For featured projects, try to load from public/projects directory
  if (project.featured) {
    // Try to find media file with allowed extensions
    for (const ext of ALLOWED_EXTENSIONS) {
      const mediaPath = `/projects/${project.id}.${ext}`;
      // Cache the first valid extension we try
      projectMediaCache.value.set(project.id, mediaPath);
      return mediaPath;
    }
  }

  return undefined;
};

const isVideo = (mediaPath: string | undefined): boolean => {
  if (!mediaPath) return false;
  const extension = mediaPath.split('.').pop()?.toLowerCase();
  return extension === 'mp4';
};

const validateMediaExtension = (mediaPath: string): void => {
  const extension = mediaPath.split('.').pop()?.toLowerCase();
  if (extension && !ALLOWED_EXTENSIONS.includes(extension as any)) {
    throw new Error(
      `Unsupported media extension: ${extension}. Allowed extensions: ${ALLOWED_EXTENSIONS.join(', ')}`
    );
  }
};

const handleMediaError = (project: Project) => {
  const currentMedia = projectMediaCache.value.get(project.id);

  if (currentMedia) {
    try {
      validateMediaExtension(currentMedia);
    } catch (error) {
      console.error(`Error loading media for project ${project.id}:`, error);
      projectMediaCache.value.delete(project.id);
      return;
    }
  }

  console.warn(
    `Media not found for project ${project.id}, trying next extension or falling back to placeholder`
  );

  // Try next extension if we're loading from projects directory
  if (project.featured && currentMedia?.startsWith('/projects/')) {
    const currentExt = currentMedia.split('.').pop()?.toLowerCase();
    const currentIndex = ALLOWED_EXTENSIONS.indexOf(currentExt as any);

    if (currentIndex >= 0 && currentIndex < ALLOWED_EXTENSIONS.length - 1) {
      // Try next extension
      const nextExt = ALLOWED_EXTENSIONS[currentIndex + 1];
      const nextMediaPath = `/projects/${project.id}.${nextExt}`;
      projectMediaCache.value.set(project.id, nextMediaPath);
      return;
    }
  }

  // Remove from cache so it falls back to placeholder
  projectMediaCache.value.delete(project.id);

  // If the project had an original image, try to fall back to it
  if (project.image) {
    projectMediaCache.value.set(project.id, project.image);
  }
};

const webDataCategories = ref([
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
]);

const cloudCategories = ref([
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

  // Filter out featured projects to avoid duplicates
  const webProjects = config.value.projects.filter(
    p => p.category === 'web' && !p.featured
  );
  const dataProjects = config.value.projects.filter(
    p => p.category === 'data' && !p.featured
  );
  const cloudProjects = config.value.projects.filter(
    p => p.category === 'cloud' && !p.featured
  );

  webDataCategories.value[0].projects = webProjects;
  webDataCategories.value[1].projects = dataProjects;
  cloudCategories.value[0].projects = cloudProjects;
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
  grid-template-columns: repeat(2, 1fr);
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

.project-image img,
.project-image video {
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

.web-data-categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.cloud-categories {
  display: grid;
  grid-template-columns: 1fr;
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

  .web-data-categories {
    grid-template-columns: 1fr;
  }

  .cloud-categories {
    grid-template-columns: 1fr;
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
