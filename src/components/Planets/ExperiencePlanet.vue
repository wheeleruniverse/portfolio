<template>
  <div class="experience-planet">
    <section class="section-hero">
      <div class="hero-content">
        <h2 class="section-title">Professional Experience</h2>
        <p class="hero-description">
          8+ years of professional experience building scalable solutions and leading technical initiatives.
        </p>
      </div>
    </section>

    <section class="experience-timeline">
      <h3 class="subsection-title">Career Timeline</h3>
      <div class="timeline">
        <div
          v-for="(experience, index) in experiences"
          :key="experience.id"
          class="timeline-item"
          :class="{ 'timeline-current': !experience.endDate }"
        >
          <div class="timeline-marker">
            <div class="timeline-dot" :class="{ 'current': !experience.endDate }"></div>
            <div class="timeline-line" v-if="index < experiences.length - 1"></div>
          </div>
          <div class="timeline-content">
            <div class="experience-card">
              <div class="experience-header">
                <h4 class="experience-position">{{ experience.position }}</h4>
                <div class="experience-company">{{ experience.company }}</div>
                <div class="experience-duration">
                  {{ experience.startDate }} - {{ experience.endDate || 'Present' }}
                  <span class="experience-badge" v-if="!experience.endDate">Current</span>
                </div>
              </div>
              <div class="experience-description">
                <p>{{ experience.description }}</p>
              </div>
              <div class="experience-achievements">
                <h5 class="achievements-title">Key Achievements</h5>
                <ul class="achievements-list">
                  <li
                    v-for="achievement in experience.achievements"
                    :key="achievement"
                    class="achievement-item"
                  >
                    {{ achievement }}
                  </li>
                </ul>
              </div>
              <div class="experience-technologies">
                <h5 class="tech-title">Technologies Used</h5>
                <div class="tech-tags">
                  <span
                    v-for="tech in experience.technologies"
                    :key="tech"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-summary">
      <h3 class="subsection-title">Skills Summary</h3>
      <div class="skills-grid">
        <div
          v-for="skillCategory in skillCategories"
          :key="skillCategory.category"
          class="skill-category"
        >
          <h4 class="skill-category-title">{{ skillCategory.category }}</h4>
          <div class="skill-items">
            <div
              v-for="skill in skillCategory.skills"
              :key="skill.name"
              class="skill-item"
            >
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-years">{{ skill.years }} years</span>
              </div>
              <div class="skill-bar">
                <div
                  class="skill-progress"
                  :style="`width: ${skill.percentage}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="career-stats">
      <h3 class="subsection-title">Career Highlights</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <div class="stat-number">50+</div>
            <div class="stat-label">Team Members Led</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-content">
            <div class="stat-number">100+</div>
            <div class="stat-label">Projects Delivered</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <div class="stat-number">$2M+</div>
            <div class="stat-label">Cost Savings Achieved</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-number">99.9%</div>
            <div class="stat-label">System Uptime</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Experience } from '@/types'

const experiences = ref<Experience[]>([
  {
    id: 'senior-cloud-architect',
    company: 'Tech Solutions Inc.',
    position: 'Senior Cloud Architect',
    startDate: '2022-01',
    endDate: undefined,
    description: 'Leading cloud architecture initiatives and driving digital transformation for enterprise clients.',
    achievements: [
      'Architected and implemented multi-cloud solutions serving 1M+ users',
      'Reduced infrastructure costs by 40% through cloud optimization',
      'Led team of 8 engineers in successful cloud migration projects',
      'Established DevOps practices reducing deployment time by 60%'
    ],
    technologies: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Docker', 'Python', 'Node.js', 'React']
  },
  {
    id: 'cloud-engineer',
    company: 'Innovation Labs',
    position: 'Cloud Engineer',
    startDate: '2020-03',
    endDate: '2021-12',
    description: 'Designed and implemented cloud infrastructure solutions for high-growth startups.',
    achievements: [
      'Built serverless applications handling 100K+ requests per day',
      'Implemented CI/CD pipelines reducing deployment failures by 75%',
      'Mentored 5 junior developers in cloud technologies',
      'Achieved 99.9% uptime for critical production systems'
    ],
    technologies: ['AWS', 'Lambda', 'API Gateway', 'DynamoDB', 'CloudFormation', 'Java', 'JavaScript']
  },
  {
    id: 'full-stack-developer',
    company: 'Digital Agency Pro',
    position: 'Full Stack Developer',
    startDate: '2018-06',
    endDate: '2020-02',
    description: 'Developed web applications and APIs for diverse client base across multiple industries.',
    achievements: [
      'Delivered 20+ client projects on time and under budget',
      'Improved application performance by 50% through optimization',
      'Implemented responsive designs serving desktop and mobile users',
      'Collaborated with UX/UI teams to deliver exceptional user experiences'
    ],
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'Express.js', 'HTML', 'CSS', 'JavaScript']
  },
  {
    id: 'junior-developer',
    company: 'StartupTech',
    position: 'Junior Developer',
    startDate: '2016-09',
    endDate: '2018-05',
    description: 'Started career building web applications and learning software development best practices.',
    achievements: [
      'Contributed to 10+ feature releases for main product',
      'Maintained 95% code coverage through comprehensive testing',
      'Participated in agile development processes',
      'Completed AWS certification while working full-time'
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Git', 'Linux']
  }
])

const skillCategories = ref([
  {
    category: 'Cloud Platforms',
    skills: [
      { name: 'AWS', years: 6, percentage: 95 },
      { name: 'Azure', years: 3, percentage: 75 },
      { name: 'Google Cloud', years: 2, percentage: 60 }
    ]
  },
  {
    category: 'Programming Languages',
    skills: [
      { name: 'JavaScript/TypeScript', years: 8, percentage: 95 },
      { name: 'Python', years: 5, percentage: 85 },
      { name: 'Java', years: 4, percentage: 75 },
      { name: 'PHP', years: 6, percentage: 80 }
    ]
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { name: 'Docker', years: 5, percentage: 90 },
      { name: 'Kubernetes', years: 3, percentage: 75 },
      { name: 'Terraform', years: 4, percentage: 85 },
      { name: 'CI/CD', years: 6, percentage: 90 }
    ]
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', years: 6, percentage: 90 },
      { name: 'MySQL', years: 7, percentage: 85 },
      { name: 'MongoDB', years: 4, percentage: 75 },
      { name: 'DynamoDB', years: 5, percentage: 85 }
    ]
  }
])
</script>

<style scoped>
.experience-planet {
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

.experience-timeline,
.skills-summary,
.career-stats {
  margin-bottom: 4rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #FFD700;
  margin-bottom: 2rem;
  font-family: 'Orbitron', monospace;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #FFD700;
  border: 3px solid #0B1426;
  z-index: 2;
}

.timeline-dot.current {
  background: #22C55E;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
}

.timeline-line {
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, #FFD700, rgba(255, 215, 0, 0.3));
  margin-top: 1rem;
}

.timeline-content {
  margin-left: 2rem;
}

.experience-card {
  @apply planet-card;
  transition: all 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
}

.timeline-current .experience-card {
  border-color: rgba(34, 197, 94, 0.3);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(11, 20, 38, 0.95));
}

.experience-header {
  margin-bottom: 1.5rem;
}

.experience-position {
  font-size: 1.4rem;
  font-weight: 700;
  color: #FFD700;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.experience-company {
  font-size: 1.1rem;
  color: #22C55E;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.experience-duration {
  color: #ccc;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.experience-badge {
  background: #22C55E;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
}

.experience-description {
  margin-bottom: 1.5rem;
}

.experience-description p {
  color: #ccc;
  line-height: 1.6;
}

.experience-achievements {
  margin-bottom: 1.5rem;
}

.achievements-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.75rem;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievement-item {
  color: #ccc;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.4;
}

.achievement-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #22C55E;
  font-weight: bold;
}

.experience-technologies {
  margin-top: 1.5rem;
}

.tech-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.75rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(255, 215, 0, 0.2);
  color: #FFD700;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category {
  @apply planet-card;
}

.skill-category-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #FFD700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.skill-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 600;
  color: white;
}

.skill-years {
  font-size: 0.8rem;
  color: #ccc;
}

.skill-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  transition: width 0.3s ease;
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
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD700, #FFA500);
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

@media (max-width: 768px) {
  .timeline {
    padding-left: 1rem;
  }
  
  .timeline-marker {
    left: -1rem;
  }
  
  .timeline-content {
    margin-left: 1rem;
  }
  
  .experience-duration {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>