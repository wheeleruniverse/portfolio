<template>
  <div class="education-planet">
    <section class="section-hero">
      <div class="hero-content">
        <h2 class="section-title">Education & Learning</h2>
        <p class="hero-description">
          Committed to continuous learning and professional development through
          formal education and self-directed study.
        </p>
      </div>
    </section>

    <section class="formal-education">
      <h3 class="subsection-title">Formal Education</h3>
      <div class="education-grid">
        <div
          v-for="education in formalEducation"
          :key="education.id"
          class="education-card"
        >
          <div class="education-icon">{{ education.icon }}</div>
          <div class="education-content">
            <h4 class="education-degree">{{ education.degree }}</h4>
            <p class="education-institution">{{ education.institution }}</p>
            <p class="education-year">{{ education.year }}</p>
            <p class="education-description">{{ education.description }}</p>
            <div class="education-highlights" v-if="education.highlights">
              <h5>Highlights:</h5>
              <ul>
                <li v-for="highlight in education.highlights" :key="highlight">
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="certifications-learning">
      <h3 class="subsection-title">
        Certifications & Professional Development
      </h3>
      <div class="cert-categories">
        <div
          v-for="category in certificationCategories"
          :key="category.name"
          class="cert-category"
        >
          <h4 class="cert-category-title">{{ category.name }}</h4>
          <div class="cert-items">
            <div
              v-for="cert in category.certifications"
              :key="cert.name"
              class="cert-item"
            >
              <div class="cert-badge">{{ cert.badge }}</div>
              <div class="cert-details">
                <h5 class="cert-name">{{ cert.name }}</h5>
                <p class="cert-issuer">{{ cert.issuer }}</p>
                <p class="cert-date">{{ cert.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="online-learning">
      <h3 class="subsection-title">Online Learning & Courses</h3>
      <div class="learning-platforms">
        <div
          v-for="platform in learningPlatforms"
          :key="platform.name"
          class="platform-card"
        >
          <div class="platform-icon">{{ platform.icon }}</div>
          <div class="platform-content">
            <h4 class="platform-name">{{ platform.name }}</h4>
            <p class="platform-description">{{ platform.description }}</p>
            <div class="platform-stats">
              <div class="stat-item">
                <span class="stat-number">{{ platform.courses }}</span>
                <span class="stat-label">Courses</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ platform.hours }}</span>
                <span class="stat-label">Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="learning-journey">
      <h3 class="subsection-title">Learning Journey</h3>
      <div class="journey-timeline">
        <div
          v-for="milestone in learningMilestones"
          :key="milestone.year"
          class="milestone-item"
        >
          <div class="milestone-year">{{ milestone.year }}</div>
          <div class="milestone-content">
            <h4 class="milestone-title">{{ milestone.title }}</h4>
            <p class="milestone-description">{{ milestone.description }}</p>
            <div class="milestone-achievements">
              <span
                v-for="achievement in milestone.achievements"
                :key="achievement"
                class="achievement-tag"
              >
                {{ achievement }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-development">
      <h3 class="subsection-title">Skills Development</h3>
      <div class="skills-chart">
        <div class="skills-note">
          <p>
            My learning philosophy: Stay curious, practice consistently, and
            never stop growing.
          </p>
        </div>
        <div class="learning-stats">
          <div class="learning-stat">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <div class="stat-number">500+</div>
              <div class="stat-label">Hours Learning</div>
            </div>
          </div>
          <div class="learning-stat">
            <div class="stat-icon">🎓</div>
            <div class="stat-content">
              <div class="stat-number">25+</div>
              <div class="stat-label">Certifications</div>
            </div>
          </div>
          <div class="learning-stat">
            <div class="stat-icon">💡</div>
            <div class="stat-content">
              <div class="stat-number">50+</div>
              <div class="stat-label">Courses</div>
            </div>
          </div>
          <div class="learning-stat">
            <div class="stat-icon">🌟</div>
            <div class="stat-content">
              <div class="stat-number">Always</div>
              <div class="stat-label">Learning</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CertificationsSection
      title="AWS Certifications"
      description="My AWS certifications demonstrating comprehensive cloud expertise"
      :certifications="awsCertifications"
      :isLoading="isLoading"
      :error="error"
    />

    <CertificationsSection
      title="Other Certifications"
      description="Additional certifications in various technologies and methodologies"
      :certifications="otherCertifications"
      :isLoading="isLoading"
      :error="error"
    />
  </div>

  <ReturnToSolarSystem />
</template>

<script setup lang="ts">
import CertificationsSection from '@/components/CertificationsSection.vue';
import ReturnToSolarSystem from '@/components/ReturnToSolarSystem.vue';
import type { Certification } from '@/types';
import { computed, onMounted, ref } from 'vue';

const allCertifications = ref<Certification[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const awsCertifications = computed(() => 
  allCertifications.value.filter(cert => cert.vendor === 'AWS')
);

const otherCertifications = computed(() => 
  allCertifications.value.filter(cert => cert.vendor !== 'AWS')
);

const loadCertifications = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const response = await fetch('/portfolio-config.json');
    if (!response.ok) {
      throw new Error(`Failed to load config: ${response.statusText}`);
    }

    const config = await response.json();
    allCertifications.value = config.certifications || [];
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load certifications';
    console.error('Error loading certifications:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadCertifications();
});

const formalEducation = ref([
  {
    id: 'bachelors',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'State University',
    year: '2016',
    icon: '🎓',
    description:
      'Comprehensive study of computer science fundamentals, software engineering, and system design.',
    highlights: [
      'Graduated Magna Cum Laude',
      'President of Computer Science Club',
      'Capstone project: Cloud-based inventory management system',
      'Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development',
    ],
  },
  {
    id: 'associates',
    degree: 'Associate of Science in Information Technology',
    institution: 'Community College',
    year: '2014',
    icon: '💻',
    description:
      'Foundation in information technology concepts and practical application.',
    highlights: [
      "Dean's List for 4 consecutive semesters",
      'IT Help Desk volunteer',
      'Networking and System Administration focus',
    ],
  },
]);

const certificationCategories = ref([
  {
    name: 'Cloud Computing',
    certifications: [
      {
        name: 'AWS Solutions Architect Professional',
        issuer: 'Amazon Web Services',
        date: '2023',
        badge: '☁️',
      },
      {
        name: 'AWS DevOps Engineer Professional',
        issuer: 'Amazon Web Services',
        date: '2023',
        badge: '⚙️',
      },
      {
        name: 'AWS Security Specialty',
        issuer: 'Amazon Web Services',
        date: '2023',
        badge: '🔒',
      },
      {
        name: 'Microsoft Azure Fundamentals',
        issuer: 'Microsoft',
        date: '2022',
        badge: '💙',
      },
    ],
  },
  {
    name: 'Development & Programming',
    certifications: [
      {
        name: 'JavaScript Algorithms and Data Structures',
        issuer: 'freeCodeCamp',
        date: '2020',
        badge: '🔤',
      },
      {
        name: 'Vue.js 3 Certification',
        issuer: 'Vue School',
        date: '2021',
        badge: '🟢',
      },
      {
        name: 'Node.js Application Development',
        issuer: 'OpenJS Foundation',
        date: '2021',
        badge: '🟢',
      },
    ],
  },
  {
    name: 'Project Management',
    certifications: [
      {
        name: 'Agile Project Management',
        issuer: 'Scrum Alliance',
        date: '2022',
        badge: '🔄',
      },
      {
        name: 'Google Project Management',
        issuer: 'Google',
        date: '2022',
        badge: '📊',
      },
    ],
  },
]);

const learningPlatforms = ref([
  {
    name: 'AWS Training',
    description: 'Official AWS training courses and labs',
    icon: '☁️',
    courses: '30+',
    hours: '200+',
  },
  {
    name: 'Pluralsight',
    description: 'Technology skills platform for developers',
    icon: '📚',
    courses: '25+',
    hours: '150+',
  },
  {
    name: 'freeCodeCamp',
    description: 'Free coding bootcamp and certification',
    icon: '🔥',
    courses: '10+',
    hours: '300+',
  },
  {
    name: 'YouTube/Udemy',
    description: 'Various technical courses and tutorials',
    icon: '📹',
    courses: '50+',
    hours: '100+',
  },
]);

const learningMilestones = ref([
  {
    year: '2024',
    title: 'Advanced Cloud Architecture',
    description:
      'Deepening expertise in multi-cloud architectures and advanced AWS services.',
    achievements: [
      'AWS Community Builder',
      'Technical Blog Launch',
      'Conference Speaking',
    ],
  },
  {
    year: '2023',
    title: 'Professional Certifications',
    description:
      'Achieved professional-level AWS certifications and specialty credentials.',
    achievements: [
      'AWS Pro Certifications',
      'Security Specialty',
      'DevOps Expertise',
    ],
  },
  {
    year: '2022',
    title: 'Leadership Development',
    description:
      'Focused on developing leadership skills and project management capabilities.',
    achievements: [
      'Team Lead Role',
      'Project Management Cert',
      'Mentorship Program',
    ],
  },
  {
    year: '2021',
    title: 'Modern Web Development',
    description:
      'Mastered modern JavaScript frameworks and full-stack development.',
    achievements: ['Vue.js Expert', 'Node.js Proficiency', 'API Design'],
  },
  {
    year: '2020',
    title: 'Cloud Fundamentals',
    description:
      'Started cloud computing journey with AWS fundamentals and first certifications.',
    achievements: [
      'First AWS Cert',
      'Cloud Practitioner',
      'Solutions Architect',
    ],
  },
]);
</script>

<style scoped>
.education-planet {
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

.formal-education,
.certifications-learning,
.online-learning,
.learning-journey,
.skills-development {
  margin-bottom: 4rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 2rem;
  font-family: 'Orbitron', monospace;
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.education-card {
  @apply planet-card;
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.education-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.2);
}

.education-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9333ea, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.education-content {
  flex: 1;
}

.education-degree {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.education-institution {
  font-size: 1.1rem;
  color: #9333ea;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.education-year {
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.education-description {
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.education-highlights h5 {
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.education-highlights ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.education-highlights li {
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  padding-left: 1rem;
  position: relative;
}

.education-highlights li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #9333ea;
  font-weight: bold;
}

.cert-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.cert-category {
  @apply planet-card;
}

.cert-category-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.cert-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cert-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.cert-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.cert-badge {
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9333ea, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cert-details {
  flex: 1;
}

.cert-name {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.cert-issuer {
  font-size: 0.9rem;
  color: #9333ea;
  margin-bottom: 0.25rem;
}

.cert-date {
  font-size: 0.8rem;
  color: #ccc;
}

.learning-platforms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.platform-card {
  @apply planet-card;
  text-align: center;
  transition: all 0.3s ease;
}

.platform-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.2);
}

.platform-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.platform-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 0.5rem;
}

.platform-description {
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.platform-stats {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #9333ea;
  font-family: 'Orbitron', monospace;
}

.stat-label {
  font-size: 0.8rem;
  color: #ccc;
  margin-top: 0.25rem;
}

.journey-timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.milestone-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 1.5rem;
  background: rgba(11, 20, 38, 0.8);
  border-radius: 1rem;
  border-left: 4px solid #9333ea;
  transition: all 0.3s ease;
}

.milestone-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 20px rgba(147, 51, 234, 0.2);
}

.milestone-year {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffd700;
  font-family: 'Orbitron', monospace;
  min-width: 80px;
}

.milestone-content {
  flex: 1;
}

.milestone-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.milestone-description {
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.milestone-achievements {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.achievement-tag {
  background: rgba(147, 51, 234, 0.2);
  color: #a855f7;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid rgba(147, 51, 234, 0.3);
}

.skills-chart {
  text-align: center;
}

.skills-note {
  margin-bottom: 3rem;
}

.skills-note p {
  font-size: 1.1rem;
  color: #ccc;
  font-style: italic;
  line-height: 1.5;
}

.learning-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.learning-stat {
  @apply planet-card;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.learning-stat:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.2);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9333ea, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.learning-stat .stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffd700;
}

.learning-stat .stat-label {
  font-size: 0.9rem;
  color: #ccc;
}

@media (max-width: 768px) {
  .education-grid {
    grid-template-columns: 1fr;
  }

  .education-card {
    flex-direction: column;
    text-align: center;
  }

  .cert-categories {
    grid-template-columns: 1fr;
  }

  .learning-platforms {
    grid-template-columns: repeat(2, 1fr);
  }

  .milestone-item {
    flex-direction: column;
    gap: 1rem;
  }

  .milestone-year {
    min-width: auto;
  }

  .learning-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .learning-stat {
    flex-direction: column;
    text-align: center;
  }
}
</style>
