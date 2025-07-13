<template>
  <div class="aws-planet">
    <section class="section-hero">
      <div class="hero-content">
        <h2 class="section-title">AWS Cloud Expertise</h2>
        <p class="hero-description">
          With all active AWS certifications and years of hands-on experience, I bring comprehensive cloud expertise to every project.
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
            <p class="cert-date">{{ cert.date }}</p>
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
      <h3 class="subsection-title">AWS Services Expertise</h3>
      <div class="services-grid">
        <div
          v-for="service in services"
          :key="service.category"
          class="service-category"
        >
          <h4 class="service-title">{{ service.category }}</h4>
          <div class="service-items">
            <span
              v-for="item in service.items"
              :key="item"
              class="service-item"
            >
              {{ item }}
            </span>
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
import { ref, onMounted } from 'vue'
import type { Certification } from '@/types'

const certifications = ref<Certification[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const loadCertifications = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await fetch('/portfolio-config.json')
    if (!response.ok) {
      throw new Error(`Failed to load config: ${response.statusText}`)
    }
    
    const config = await response.json()
    certifications.value = config.certifications || []
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load certifications'
    console.error('Error loading certifications:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCertifications()
})

const services = ref([
  {
    category: 'Compute',
    items: ['EC2', 'Lambda', 'ECS', 'EKS', 'Fargate', 'Batch']
  },
  {
    category: 'Storage',
    items: ['S3', 'EBS', 'EFS', 'Glacier', 'FSx']
  },
  {
    category: 'Database',
    items: ['RDS', 'DynamoDB', 'Aurora', 'ElastiCache', 'Neptune']
  },
  {
    category: 'Networking',
    items: ['VPC', 'CloudFront', 'Route 53', 'API Gateway', 'Load Balancer']
  },
  {
    category: 'Security',
    items: ['IAM', 'KMS', 'Secrets Manager', 'WAF', 'Shield', 'GuardDuty']
  },
  {
    category: 'DevOps',
    items: ['CodePipeline', 'CodeBuild', 'CodeDeploy', 'CloudFormation', 'CDK']
  }
])

const cloudJourney = ref([
  {
    year: '2019',
    title: 'Cloud Journey Begins',
    description: 'Started learning AWS fundamentals and got first hands-on experience with EC2 and S3.'
  },
  {
    year: '2020',
    title: 'First Certifications',
    description: 'Achieved AWS Cloud Practitioner and Solutions Architect Associate certifications.'
  },
  {
    year: '2022',
    title: 'Associate Level Complete',
    description: 'Completed all three Associate-level certifications and began working with enterprise clients.'
  },
  {
    year: '2023',
    title: 'Professional & Specialty',
    description: 'Achieved Professional-level certifications and specialized in Security and DevOps.'
  },
  {
    year: '2024',
    title: 'AWS Community Builder',
    description: 'Became an AWS Community Builder, sharing knowledge and helping others in their cloud journey.'
  }
])
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
  color: #FFD700;
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
  color: #FFD700;
  margin-bottom: 2rem;
  font-family: 'Orbitron', monospace;
}

.loading-message, .error-message {
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
  background: linear-gradient(135deg, #FFD700, #FFA500);
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

.cert-date {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.5rem;
}

.cert-link {
  color: #FFD700;
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

.service-category {
  @apply planet-card;
}

.service-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #FFD700;
  margin-bottom: 1rem;
}

.service-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  border-left: 4px solid #FFD700;
}

.timeline-year {
  font-size: 1.2rem;
  font-weight: 700;
  color: #FFD700;
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