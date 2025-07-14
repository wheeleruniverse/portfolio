<template>
  <div class="development-planet">
    <section class="section-hero">
      <div class="hero-content">
        <h2 class="section-title">Development Expertise</h2>
        <p class="hero-description">
          Full-stack development experience with modern technologies and best
          practices.
        </p>
      </div>
    </section>

    <section class="tech-stack-section">
      <h3 class="subsection-title">Technology Stack</h3>
      <div class="tech-categories">
        <div
          v-for="category in techStack"
          :key="category.name"
          class="tech-category"
        >
          <h4 class="tech-category-title">{{ category.name }}</h4>
          <div class="tech-items">
            <div
              v-for="tech in category.technologies"
              :key="tech.name"
              class="tech-item"
              :class="`proficiency-${tech.level}`"
            >
              <div class="tech-info">
                <span class="tech-name">{{ tech.name }}</span>
                <span class="tech-level">{{ tech.level }}</span>
              </div>
              <div class="tech-bar">
                <div
                  class="tech-progress"
                  :style="`width: ${tech.percentage}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="code-stats-section">
      <h3 class="subsection-title">Code Statistics</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-number">50+</div>
            <div class="stat-label">Projects Completed</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔧</div>
          <div class="stat-content">
            <div class="stat-number">10+</div>
            <div class="stat-label">Languages</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-number">5+</div>
            <div class="stat-label">Years Experience</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-content">
            <div class="stat-number">100%</div>
            <div class="stat-label">Remote Ready</div>
          </div>
        </div>
      </div>
    </section>

    <section class="specializations-section">
      <h3 class="subsection-title">Specializations</h3>
      <div class="specializations-grid">
        <div
          v-for="spec in specializations"
          :key="spec.title"
          class="specialization-card"
        >
          <div class="spec-icon">{{ spec.icon }}</div>
          <h4 class="spec-title">{{ spec.title }}</h4>
          <p class="spec-description">{{ spec.description }}</p>
          <div class="spec-skills">
            <span v-for="skill in spec.skills" :key="skill" class="skill-tag">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const techStack = ref([
  {
    name: 'Frontend',
    technologies: [
      { name: 'Vue.js', level: 'Advanced', percentage: 90 },
      { name: 'React', level: 'Intermediate', percentage: 75 },
      { name: 'TypeScript', level: 'Advanced', percentage: 85 },
      { name: 'JavaScript', level: 'Expert', percentage: 95 },
      { name: 'HTML/CSS', level: 'Expert', percentage: 95 },
      { name: 'Tailwind CSS', level: 'Advanced', percentage: 88 },
    ],
  },
  {
    name: 'Backend',
    technologies: [
      { name: 'Node.js', level: 'Advanced', percentage: 85 },
      { name: 'Python', level: 'Advanced', percentage: 80 },
      { name: 'Java', level: 'Intermediate', percentage: 70 },
      { name: 'C#', level: 'Intermediate', percentage: 65 },
      { name: 'PHP', level: 'Intermediate', percentage: 60 },
    ],
  },
  {
    name: 'Database',
    technologies: [
      { name: 'PostgreSQL', level: 'Advanced', percentage: 85 },
      { name: 'MySQL', level: 'Advanced', percentage: 80 },
      { name: 'MongoDB', level: 'Intermediate', percentage: 75 },
      { name: 'Redis', level: 'Intermediate', percentage: 70 },
      { name: 'DynamoDB', level: 'Advanced', percentage: 82 },
    ],
  },
  {
    name: 'DevOps',
    technologies: [
      { name: 'Docker', level: 'Advanced', percentage: 85 },
      { name: 'Kubernetes', level: 'Intermediate', percentage: 70 },
      { name: 'CI/CD', level: 'Advanced', percentage: 88 },
      { name: 'Terraform', level: 'Advanced', percentage: 85 },
      { name: 'AWS CDK', level: 'Advanced', percentage: 90 },
    ],
  },
]);

const specializations = ref([
  {
    icon: '☁️',
    title: 'Cloud-Native Development',
    description:
      'Building scalable applications designed for cloud environments',
    skills: [
      'Microservices',
      'Serverless',
      'Container Orchestration',
      'API Gateway',
    ],
  },
  {
    icon: '🔧',
    title: 'DevOps & Automation',
    description: 'Implementing CI/CD pipelines and infrastructure as code',
    skills: ['GitLab CI', 'GitHub Actions', 'Jenkins', 'Ansible'],
  },
  {
    icon: '🎨',
    title: 'Frontend Architecture',
    description:
      'Creating responsive, accessible, and performant user interfaces',
    skills: [
      'Component Libraries',
      'State Management',
      'PWA',
      'Web Performance',
    ],
  },
  {
    icon: '🔒',
    title: 'Security & Compliance',
    description:
      'Implementing security best practices and compliance frameworks',
    skills: ['OAuth', 'JWT', 'OWASP', 'Data Encryption'],
  },
]);
</script>

<style scoped>
.development-planet {
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

.tech-stack-section,
.code-stats-section,
.specializations-section {
  margin-bottom: 4rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 2rem;
  font-family: 'Orbitron', monospace;
}

.tech-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tech-category {
  @apply planet-card;
}

.tech-category-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tech-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.tech-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.tech-name {
  font-weight: 600;
  color: white;
}

.tech-level {
  font-size: 0.8rem;
  color: #ccc;
}

.tech-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.tech-progress {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  transition: width 0.3s ease;
}

.proficiency-expert .tech-progress {
  background: linear-gradient(90deg, #10b981, #059669);
}

.proficiency-advanced .tech-progress {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.proficiency-intermediate .tech-progress {
  background: linear-gradient(90deg, #f59e0b, #d97706);
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
  box-shadow: 0 10px 30px rgba(79, 70, 229, 0.2);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
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

.specializations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.specialization-card {
  @apply planet-card;
  text-align: center;
  transition: all 0.3s ease;
}

.specialization-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(79, 70, 229, 0.3);
}

.spec-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.spec-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 1rem;
}

.spec-description {
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.spec-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skill-tag {
  background: rgba(79, 70, 229, 0.2);
  color: #a5b4fc;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid rgba(79, 70, 229, 0.3);
}

@media (max-width: 768px) {
  .tech-categories {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .specializations-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
