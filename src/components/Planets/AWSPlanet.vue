<template>
  <div class="aws-planet">
    <section class="section-hero">
      <div class="hero-content">
        <h2 class="section-title">AWS Cloud Expertise</h2>
        <p class="hero-description">
          With all active AWS certifications and years of hands-on experience, I
          bring comprehensive cloud expertise to every project.
        </p>
        <div class="aws-stats">
          <div class="stat-item">
            <div class="stat-number">15+</div>
            <div class="stat-label">Active Certifications</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">7+</div>
            <div class="stat-label">Years AWS</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">All</div>
            <div class="stat-label">Service Areas</div>
          </div>
        </div>
      </div>
    </section>

    <section class="certifications-section">
      <h3 class="subsection-title">AWS Certifications</h3>

      <!-- Loading state -->
      <div v-if="isLoading" class="loading-message">
        Loading certifications...
      </div>

      <!-- Error state -->
      <div v-if="error" class="error-message">
        Error loading certifications: {{ error }}
      </div>

      <!-- Certifications grid -->
      <div v-if="!isLoading && !error" class="certifications-grid">
        <div
          v-for="cert in certifications"
          :key="cert.id"
          class="certification-card"
        >
          <div class="cert-badge">
            <div class="cert-icon">🏆</div>
          </div>
          <div class="cert-content">
            <h4 class="cert-name">{{ cert.name }}</h4>
            <p class="cert-issuer">{{ cert.issuer }}</p>
            <p class="cert-level">{{ cert.level }}</p>
            <p class="cert-date">Issued: {{ cert.issueDate }}</p>
            <p class="cert-expiry" v-if="cert.expiryDate">
              Expires: {{ cert.expiryDate }}
            </p>
            <a
              v-if="cert.credlyUrl"
              :href="cert.credlyUrl"
              class="cert-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Credential
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="services-section">
      <h3 class="subsection-title">AWS Projects & Services</h3>
      <p class="services-description">
        Real-world projects showcasing AWS services in action. Click on any
        project to learn more.
      </p>

      <!-- Loading state -->
      <div v-if="isLoading" class="loading-message">
        Loading AWS projects...
      </div>

      <!-- Error state -->
      <div v-if="error" class="error-message">
        Error loading projects: {{ error }}
      </div>

      <!-- Projects grid -->
      <div v-if="!isLoading && !error" class="services-grid">
        <div
          v-for="project in awsProjects"
          :key="project.id"
          class="service-category project-card"
          @click="navigateToProject(project.id)"
        >
          <h4 class="service-title">{{ project.name }}</h4>
          <p class="project-description">{{ project.description }}</p>
          <div class="service-items">
            <span
              v-for="service in filterAWSServices(project.technologies)"
              :key="service"
              class="service-item"
            >
              {{ service }}
            </span>
          </div>
          <div class="project-action">
            <span class="action-text">Click to view project details →</span>
          </div>
        </div>
      </div>

      <!-- Service Usage Statistics -->
      <div
        v-if="!isLoading && !error && serviceUsageStats.length > 0"
        class="service-usage-section"
      >
        <h4 class="usage-title">Most Used AWS Services</h4>
        <p class="usage-description">
          Based on {{ awsProjects.length }} AWS projects in my portfolio
        </p>
        <div class="usage-chart">
          <div
            v-for="(stat, index) in serviceUsageStats"
            :key="stat.service"
            class="usage-bar-container"
          >
            <div class="usage-bar-info">
              <span class="service-name">{{ stat.service }}</span>
              <span class="service-count">{{ stat.count }}</span>
            </div>
            <div class="usage-bar-track">
              <div
                class="usage-bar"
                :style="{
                  'width': `${(stat.count / serviceUsageStats[0].count) * 100}%`,
                  '--bar-delay': `${index * 100}ms`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cloud-journey">
      <h3 class="subsection-title">Cloud Journey</h3>
      <div class="journey-timeline">
        <div
          v-for="milestone in cloudJourney"
          :key="milestone.year"
          class="timeline-item"
        >
          <div class="timeline-year">{{ milestone.year }}</div>
          <div class="timeline-content">
            <h4 class="timeline-title">{{ milestone.title }}</h4>
            <p class="timeline-description">{{ milestone.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Certification, Project } from '@/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const certifications = ref<Certification[]>([]);
const awsProjects = ref<Project[]>([]);
const serviceUsageStats = ref<Array<{ service: string; count: number }>>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const loadData = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const response = await fetch('/portfolio-config.json');
    if (!response.ok) {
      throw new Error(`Failed to load config: ${response.statusText}`);
    }

    const config = await response.json();
    // Filter for AWS certifications only
    certifications.value = (config.certifications || []).filter(
      (cert: any) => cert.vendor === 'AWS'
    );

    // Filter projects that have AWS/Amazon technologies
    awsProjects.value = (config.projects || []).filter((project: Project) => {
      return project.technologies.some(
        (tech: string) => tech.startsWith('AWS') || tech.startsWith('Amazon')
      );
    });

    // Calculate service usage statistics
    calculateServiceUsage();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data';
    console.error('Error loading data:', err);
  } finally {
    isLoading.value = false;
  }
};

const calculateServiceUsage = () => {
  const serviceCount: Record<string, number> = {};

  awsProjects.value.forEach(project => {
    const awsServices = filterAWSServices(project.technologies);
    awsServices.forEach(service => {
      serviceCount[service] = (serviceCount[service] || 0) + 1;
    });
  });

  // Convert to array and sort by count (descending), then by name (ascending)
  serviceUsageStats.value = Object.entries(serviceCount)
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count; // Sort by count descending
      }
      return a.service.localeCompare(b.service); // Then by name ascending
    })
    .slice(0, 10); // Top 10 services
};

const filterAWSServices = (technologies: string[]) => {
  return technologies
    .filter(tech => tech.startsWith('AWS') || tech.startsWith('Amazon'))
    .map(tech => tech.replace(/^(AWS |Amazon )/, ''))
    .sort();
};

const navigateToProject = (projectId: string) => {
  router.push({
    name: 'planet',
    params: { id: 'projects' },
    query: { project: projectId },
  });
};

onMounted(() => {
  loadData();
});

const cloudJourney = ref([
  {
    year: '2016',
    title: 'Pivoting to Web Development & First Exposure to AWS',
    description:
      'After graduating with a degree in game design development, I enrolled in a web development boot camp where I was first introduced to AWS.',
  },
  {
    year: '2017',
    title: 'Beginning AWS Certification Journey at Verizon',
    description:
      'Hired as a Java developer at Verizon, I began to leverage company initiatives and resources to pursue AWS certifications, starting my dedicated study.',
  },
  {
    year: '2018',
    title: 'First AWS Certifications & Leading Migration Efforts',
    description:
      'I earned my first AWS certification and then quickly followed with three more AWS certs in the same year. By the end of 2018, I was working with my manager to lead an AWS migration for Verizon, moving services from on-premise to AWS.',
  },
  {
    year: '2020',
    title: 'Becoming a Cloud Architect',
    description:
      'My expertise and certifications led to my promotion to Cloud Architect at Verizon, signifying my deep understanding and practical application of cloud technologies.',
  },
  {
    year: '2021',
    title: 'Joining Bravo LT & Becoming an AWS Community Builder',
    description:
      'I transitioned to Bravo LT, my current company, and in the same year, I became an AWS Community Builder, actively contributing to the AWS community.',
  },
  {
    year: '2022',
    title: 'Achieving All AWS Certifications',
    description:
      'I accomplished the remarkable feat of acquiring all 12 or 13 AWS certifications, demonstrating unparalleled dedication and comprehensive knowledge across the AWS ecosystem.',
  },
  {
    year: '2023',
    title: 'Expanding to Multi-Cloud & Continued Learning',
    description:
      'Recognizing the industry trend towards multi-cloud, I expanded my expertise by earning Azure Fundamentals, GCP Cloud Digital Leader, and Kubernetes Fundamentals certifications. I continue to focus on Google Cloud to better support clients like Gordon Food Service.',
  },
]);
</script>

<style scoped>
.aws-planet {
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

.aws-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #ffd700;
  font-family: 'Orbitron', monospace;
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 0.5rem;
}

.certifications-section,
.services-section,
.cloud-journey {
  margin-bottom: 4rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 2rem;
  font-family: 'Orbitron', monospace;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 2rem;
  font-family: 'Orbitron', monospace;
}

.loading-message {
  color: #ccc;
}

.error-message {
  color: #ff6b6b;
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.certification-card {
  @apply planet-card;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.certification-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
}

.cert-badge {
  flex-shrink: 0;
}

.cert-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #ffa500);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cert-content {
  flex: 1;
}

.cert-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.cert-issuer {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.25rem;
}

.cert-level {
  color: #ffd700;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.cert-date,
.cert-expiry {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.25rem;
}

.cert-expiry {
  margin-bottom: 0.5rem;
}

.cert-link {
  color: #ffd700;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.cert-link:hover {
  text-decoration: underline;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.services-description {
  text-align: center;
  color: #ccc;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.service-category {
  @apply planet-card;
  display: flex;
  flex-direction: column;
}

.service-category.project-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-category.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.3);
  border-color: rgba(255, 215, 0, 0.5);
}

.service-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 1rem;
}

.project-description {
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.service-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.service-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-action {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.action-text {
  color: #ffd700;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.8;
}

.service-usage-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.usage-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 0.5rem;
  text-align: center;
}

.usage-description {
  text-align: center;
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.usage-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.usage-bar-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.usage-bar-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service-name {
  font-weight: 600;
  color: white;
  font-size: 0.9rem;
}

.service-count {
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.usage-bar-track {
  background: rgba(255, 255, 255, 0.1);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.usage-bar {
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ffa500);
  border-radius: 4px;
  transition: width 1s ease-out;
  animation: slideIn 1s ease-out var(--bar-delay, 0ms);
  transform-origin: left;
}

@keyframes slideIn {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

.journey-timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 1.5rem;
  background: rgba(11, 20, 38, 0.8);
  border-radius: 1rem;
  border-left: 4px solid #ffd700;
}

.timeline-year {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffd700;
  font-family: 'Orbitron', monospace;
  min-width: 80px;
}

.timeline-content {
  flex: 1;
}

.timeline-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.timeline-description {
  color: #ccc;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .aws-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .certifications-grid {
    grid-template-columns: 1fr;
  }

  .certification-card {
    flex-direction: column;
    text-align: center;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .timeline-item {
    flex-direction: column;
    gap: 1rem;
  }

  .timeline-year {
    min-width: auto;
  }
}
</style>
