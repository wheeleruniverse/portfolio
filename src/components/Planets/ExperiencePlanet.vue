<template>
  <div class="experience-planet">
    <section class="section-hero">
      <div class="hero-content">
        <h2 class="section-title">Professional Experience</h2>
        <p class="hero-description">
          {{ getExperienceYears() }}+ years of professional experience building
          scalable solutions and leading technical initiatives.
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
            <div
              class="timeline-dot"
              :class="{ current: !experience.endDate }"
            ></div>
            <div
              class="timeline-line"
              v-if="index < experiences.length - 1"
            ></div>
          </div>
          <div class="timeline-content">
            <div class="experience-card">
              <div class="experience-header">
                <h4 class="experience-position">{{ experience.position }}</h4>
                <div class="experience-company">{{ experience.company }}</div>
                <div class="experience-duration">
                  {{ experience.startDate }} -
                  {{ experience.endDate || 'Present' }}
                  <span class="experience-badge" v-if="!experience.endDate"
                    >Current</span
                  >
                  <span
                    class="experience-duration-badge"
                    v-if="experience.duration"
                  >
                    {{ experience.duration }}
                  </span>
                </div>
                <div
                  class="experience-meta"
                  v-if="
                    experience.client ||
                    experience.project ||
                    experience.manager
                  "
                >
                  <div v-if="experience.client" class="experience-client">
                    <strong>Client:</strong> {{ experience.client }}
                  </div>
                  <div v-if="experience.project" class="experience-project">
                    <strong>Project:</strong> {{ experience.project }}
                  </div>
                  <div v-if="experience.manager" class="experience-manager">
                    <strong>Manager:</strong> {{ experience.manager }}
                  </div>
                </div>
              </div>
              <div class="experience-description">
                <p>{{ experience.description }}</p>
              </div>
              <div
                class="experience-achievements"
                v-if="
                  experience.achievements && experience.achievements.length > 0
                "
              >
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
              <div
                class="experience-technologies"
                v-if="
                  experience.technologies && experience.technologies.length > 0
                "
              >
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
  </div>

  <ReturnToSolarSystem />
</template>

<script setup lang="ts">
import ReturnToSolarSystem from '@/components/Navigation/ReturnToSolarSystem.vue';
import { usePortfolioConfig } from '@/composables/usePortfolioConfig';
import type { Experience } from '@/types';
import { onMounted, ref } from 'vue';

interface SkillCategory {
  category: string;
  skills: {
    name: string;
    years: number;
    percentage: number;
  }[];
}

const { config } = usePortfolioConfig();
const experiences = ref<Experience[]>([]);
const skillCategories = ref<SkillCategory[]>([]);

const loadConfig = async () => {
  experiences.value = config.value?.experience || [];
  skillCategories.value = (config.value as any)?.skillCategories || [];
};

const getExperienceYears = () => {
  if (!experiences.value || experiences.value.length === 0) return 8;

  // Calculate years based on oldest start date
  const startDates = experiences.value.map(exp => {
    return parseInt(exp.startDate.split(' ')[1] || exp.startDate.split('-')[0]);
  });

  const earliestYear = Math.min(...startDates);
  const currentYear = new Date().getFullYear();
  return currentYear - earliestYear;
};

onMounted(() => {
  loadConfig();
});
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
.skills-summary {
  margin-bottom: 4rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffd700;
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
  background: #ffd700;
  border: 3px solid #0b1426;
  z-index: 2;
}

.timeline-dot.current {
  background: #22c55e;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
}

.timeline-line {
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, #ffd700, rgba(255, 215, 0, 0.3));
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
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.05),
    rgba(11, 20, 38, 0.95)
  );
}

.experience-header {
  margin-bottom: 1.5rem;
}

.experience-position {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.experience-company {
  font-size: 1.1rem;
  color: #22c55e;
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
  background: #22c55e;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
}

.experience-duration-badge {
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.experience-meta {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  border-left: 3px solid #ffd700;
}

.experience-meta > div {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: #ccc;
}

.experience-meta > div:last-child {
  margin-bottom: 0;
}

.experience-meta strong {
  color: #ffd700;
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
  color: #22c55e;
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
  color: #ffd700;
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
  color: #ffd700;
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
  background: linear-gradient(90deg, #ffd700, #ffa500);
  transition: width 0.3s ease;
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
}
</style>
