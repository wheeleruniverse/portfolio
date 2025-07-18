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
          <div class="education-header">
            <div class="education-icon">{{ education.icon || '🎓' }}</div>
            <div class="education-info">
              <h4 class="education-degree">{{ education.degree }}</h4>
              <p class="education-institution">{{ education.institution }}</p>
              <p class="education-year">
                {{ education.startDate }} - {{ education.endDate }}
              </p>
              <p class="education-location" v-if="education.location">
                {{ education.location }}
              </p>
            </div>
          </div>
          <div
            class="education-highlights"
            v-if="education.highlights && education.highlights.length > 0"
          >
            <h5>Key Takeaways:</h5>
            <ul>
              <li v-for="highlight in education.highlights" :key="highlight">
                {{ highlight }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-development">
      <h3 class="subsection-title">Continuous Learning Journey</h3>

      <div class="learning-philosophy">
        <div class="philosophy-content">
          <h4 class="philosophy-title">4+ Years of Daily Learning</h4>
          <p class="philosophy-description">
            "One of the most productive things people can do is set aside a few
            minutes EVERY day to learn something new." This philosophy has
            driven my continuous growth through platforms like Pluralsight and A
            Cloud Guru.
          </p>
          <div class="philosophy-links">
            <a
              href="https://app.pluralsight.com/profile/wheeleruniverse"
              target="_blank"
              rel="noopener noreferrer"
              class="profile-link"
            >
              📚 View Pluralsight Profile
            </a>
            <a
              href="https://blog.wheeleruniverse.com/lessons-learned-pluralsight-4-years"
              target="_blank"
              rel="noopener noreferrer"
              class="blog-link"
            >
              ✍️ Read My Learning Journey
            </a>
          </div>
        </div>
      </div>

      <div class="learning-stats">
        <div class="learning-stat">
          <div class="stat-icon">📅</div>
          <div class="stat-content">
            <div class="stat-number">1,460</div>
            <div class="stat-label">Days Learning</div>
          </div>
        </div>
        <div class="learning-stat">
          <div class="stat-icon">💡</div>
          <div class="stat-content">
            <div class="stat-number">1,319+</div>
            <div class="stat-label">Courses Completed</div>
          </div>
        </div>
        <div class="learning-stat">
          <div class="stat-icon">🏆</div>
          <div class="stat-content">
            <div class="stat-number">15+</div>
            <div class="stat-label">Skill IQ Tests</div>
          </div>
        </div>
        <div class="learning-stat">
          <div class="stat-icon">🚀</div>
          <div class="stat-content">
            <div class="stat-number">Daily</div>
            <div class="stat-label">Learning Habit</div>
          </div>
        </div>
      </div>

      <div class="learning-outcomes">
        <h4 class="outcomes-title">Learning Outcomes & Benefits</h4>
        <div class="outcomes-grid">
          <div class="outcome-item">
            <div class="outcome-icon">💼</div>
            <div class="outcome-content">
              <h5>Career Advancement</h5>
              <p>
                Continuous learning directly contributed to professional growth
                and new opportunities
              </p>
            </div>
          </div>
          <div class="outcome-item">
            <div class="outcome-icon">🧠</div>
            <div class="outcome-content">
              <h5>Enhanced Brain Function</h5>
              <p>
                Daily learning improved cognitive abilities and problem-solving
                skills
              </p>
            </div>
          </div>
          <div class="outcome-item">
            <div class="outcome-icon">💡</div>
            <div class="outcome-content">
              <h5>Innovation Mindset</h5>
              <p>
                Exploring diverse technologies fostered creative thinking and
                innovative solutions
              </p>
            </div>
          </div>
          <div class="outcome-item">
            <div class="outcome-icon">😊</div>
            <div class="outcome-content">
              <h5>Personal Fulfillment</h5>
              <p>
                Found joy and satisfaction in mastering new technologies and
                concepts
              </p>
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
import CertificationsSection from '@/components/common/CertificationsSection.vue';
import ReturnToSolarSystem from '@/components/Navigation/ReturnToSolarSystem.vue';
import { usePortfolioConfig } from '@/composables/usePortfolioConfig';
import { computed } from 'vue';

const { config, isLoading, error } = usePortfolioConfig();

const allCertifications = computed(() => config.value?.certifications || []);
const formalEducation = computed(() => config.value?.education || []);

const awsCertifications = computed(() =>
  allCertifications.value
    .filter(
      cert => cert.vendor === 'AWS' || cert.issuer === 'Amazon Web Services'
    )
    .map(cert => ({
      ...cert,
      vendor: cert.vendor || 'AWS',
      level: (cert.level || 'Professional') as
        | 'Professional'
        | 'Specialty'
        | 'Associate'
        | 'Foundational',
      issueDate: cert.issueDate || cert.date,
    }))
);

const otherCertifications = computed(() =>
  allCertifications.value
    .filter(
      cert => cert.vendor !== 'AWS' && cert.issuer !== 'Amazon Web Services'
    )
    .map(cert => ({
      ...cert,
      vendor: cert.vendor || 'Other',
      level: (cert.level || 'Professional') as
        | 'Professional'
        | 'Specialty'
        | 'Associate'
        | 'Foundational',
      issueDate: cert.issueDate || cert.date,
    }))
);
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.education-card {
  @apply planet-card;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.education-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.2);
}

.education-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
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

.education-info {
  flex: 1;
  min-width: 0;
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
  margin-bottom: 0.5rem;
}

.education-location {
  color: #9333ea;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0;
}

.education-description {
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.education-highlights {
  width: 100%;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(147, 51, 234, 0.2);
}

.education-highlights h5 {
  color: white;
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.education-highlights ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.education-highlights li {
  color: #ccc;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  padding-left: 1.25rem;
  position: relative;
  line-height: 1.5;
}

.education-highlights li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #9333ea;
  font-weight: bold;
  font-size: 1.1rem;
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

/* Learning Philosophy Styles */
.learning-philosophy {
  margin-bottom: 3rem;
}

.philosophy-content {
  @apply planet-card;
  text-align: center;
  transition: all 0.3s ease;
}

.philosophy-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.2);
}

.philosophy-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

.philosophy-description {
  color: #ccc;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-style: italic;
}

.philosophy-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.profile-link,
.blog-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #9333ea, #7c3aed);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.profile-link:hover,
.blog-link:hover {
  background: linear-gradient(135deg, #7c3aed, #6b46c1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(147, 51, 234, 0.3);
  border-color: #ffd700;
}

.profile-link:focus,
.blog-link:focus {
  outline: 2px solid #ffd700;
  outline-offset: 2px;
}

/* Learning Outcomes Styles */
.learning-outcomes {
  margin-top: 3rem;
}

.outcomes-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Orbitron', monospace;
}

.outcomes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.outcome-item {
  @apply planet-card;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
}

.outcome-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.2);
}

.outcome-icon {
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

.outcome-content {
  flex: 1;
  min-width: 0;
}

.outcome-content h5 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.outcome-content p {
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .education-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }

  .education-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5rem;
  }

  .education-info {
    text-align: center;
  }

  .education-highlights {
    text-align: left;
  }

  .learning-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .learning-stat {
    flex-direction: column;
    text-align: center;
  }

  .philosophy-links {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .profile-link,
  .blog-link {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .outcomes-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .education-header {
    gap: 0.75rem;
  }

  .education-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }

  .education-degree {
    font-size: 1.1rem;
  }

  .education-institution {
    font-size: 1rem;
  }

  .education-highlights li {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }

  .learning-stats {
    grid-template-columns: 1fr;
  }

  .philosophy-title {
    font-size: 1.3rem;
  }

  .philosophy-description {
    font-size: 1rem;
  }

  .profile-link,
  .blog-link {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .outcomes-title {
    font-size: 1.3rem;
  }

  .outcome-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .outcome-content h5 {
    font-size: 1rem;
  }

  .outcome-content p {
    font-size: 0.9rem;
  }
}
</style>
