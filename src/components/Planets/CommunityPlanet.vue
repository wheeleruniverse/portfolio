<template>
  <div class="community-planet">
    <section class="section-hero">
      <div class="hero-content">
        <h2 class="section-title">Community & Contributions</h2>
        <p class="hero-description">
          Passionate about sharing knowledge, building communities, and helping
          others grow in their tech journey.
        </p>
      </div>
    </section>

    <section class="community-builder-section">
      <div class="builder-highlight">
        <div class="builder-badge">
          <div class="badge-icon">🌟</div>
          <div class="badge-content">
            <h3 class="badge-title">AWS Community Builder</h3>
            <p class="badge-description">
              Recognized by AWS for contributions to the cloud community through
              content creation, mentorship, and knowledge sharing.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="contributions-section">
      <h3 class="subsection-title">Community Contributions</h3>
      <div class="contributions-grid">
        <div
          v-for="contribution in contributions"
          :key="contribution.title"
          class="contribution-card"
        >
          <div class="contribution-icon">{{ contribution.icon }}</div>
          <div class="contribution-content">
            <h4 class="contribution-title">{{ contribution.title }}</h4>
            <p class="contribution-description">
              {{ contribution.description }}
            </p>
            <div class="contribution-stats">
              <div class="stat-item">
                <span class="stat-number">{{ contribution.count }}</span>
                <span class="stat-label">{{ contribution.metric }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="blog-section">
      <h3 class="subsection-title">Recent Blog Posts</h3>
      <div class="blog-grid">
        <div v-for="post in blogPosts" :key="post.id" class="blog-card">
          <div class="blog-content">
            <h4 class="blog-title">{{ post.title }}</h4>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <div class="blog-meta">
              <span class="blog-date">{{ post.publishedAt }}</span>
              <div class="blog-tags">
                <span v-for="tag in post.tags" :key="tag" class="blog-tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          <div class="blog-actions">
            <a
              :href="post.url"
              class="blog-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More →
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="speaking-section">
      <h3 class="subsection-title">Speaking & Interviews</h3>
      <div class="speaking-grid">
        <div
          v-for="event in speakingEvents"
          :key="event.title"
          class="speaking-card"
        >
          <div class="speaking-content">
            <h4 class="speaking-title">{{ event.title }}</h4>
            <p class="speaking-venue">{{ event.venue }}</p>
            <p class="speaking-description">{{ event.description }}</p>
            <div class="speaking-meta">
              <span class="speaking-date">{{ event.date }}</span>
              <span class="speaking-type">{{ event.type }}</span>
            </div>
          </div>
          <div class="speaking-actions" v-if="event.url">
            <a
              :href="event.url"
              class="speaking-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View →
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="involvement-section">
      <h3 class="subsection-title">Community Involvement</h3>
      <div class="involvement-grid">
        <div
          v-for="involvement in communityInvolvement"
          :key="involvement.organization"
          class="involvement-card"
        >
          <div class="involvement-icon">{{ involvement.icon }}</div>
          <div class="involvement-content">
            <h4 class="involvement-title">{{ involvement.organization }}</h4>
            <p class="involvement-role">{{ involvement.role }}</p>
            <p class="involvement-description">{{ involvement.description }}</p>
            <div class="involvement-activities">
              <span
                v-for="activity in involvement.activities"
                :key="activity"
                class="activity-tag"
              >
                {{ activity }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <ReturnToSolarSystem />
</template>

<script setup lang="ts">
import ReturnToSolarSystem from '@/components/ReturnToSolarSystem.vue';
import type { BlogPost } from '@/types';
import { ref } from 'vue';

const contributions = ref([
  {
    title: 'Technical Blog Posts',
    description: 'Sharing insights on AWS, development, and cloud architecture',
    icon: '📝',
    count: '25+',
    metric: 'Articles',
  },
  {
    title: 'Community Mentorship',
    description:
      'Helping developers transition to cloud and advance their careers',
    icon: '🤝',
    count: '50+',
    metric: 'Mentees',
  },
  {
    title: 'Open Source',
    description: 'Contributing to projects and maintaining developer tools',
    icon: '💻',
    count: '15+',
    metric: 'Projects',
  },
  {
    title: 'Speaking Events',
    description: 'Presenting at conferences, meetups, and community events',
    icon: '🎤',
    count: '10+',
    metric: 'Talks',
  },
]);

const blogPosts = ref<BlogPost[]>([
  {
    id: '1',
    title: 'Building Serverless Applications with AWS Lambda',
    excerpt:
      'A comprehensive guide to creating scalable serverless applications using AWS Lambda, API Gateway, and DynamoDB.',
    publishedAt: '2024-01-15',
    url: 'https://wheeleruniverse.netlify.app/blog/serverless-lambda-guide',
    tags: ['AWS', 'Lambda', 'Serverless', 'API Gateway'],
  },
  {
    id: '2',
    title: 'Cloud Security Best Practices',
    excerpt:
      'Essential security practices for cloud deployments, including IAM policies, encryption, and monitoring.',
    publishedAt: '2024-01-08',
    url: 'https://wheeleruniverse.netlify.app/blog/cloud-security-practices',
    tags: ['Security', 'AWS', 'IAM', 'Best Practices'],
  },
  {
    id: '3',
    title: 'Infrastructure as Code with AWS CDK',
    excerpt:
      'Learn how to manage cloud infrastructure using AWS CDK and TypeScript for better maintainability.',
    publishedAt: '2023-12-20',
    url: 'https://wheeleruniverse.netlify.app/blog/aws-cdk-infrastructure',
    tags: ['AWS CDK', 'Infrastructure', 'TypeScript', 'DevOps'],
  },
]);

const speakingEvents = ref([
  {
    title: 'The Future of Cloud Development',
    venue: 'Red Monk Developer Interview',
    description:
      'Discussed trends in cloud-native development and the evolving role of developers in the cloud era.',
    date: '2024-02-15',
    type: 'Interview',
    url: 'https://redmonk.com/interviews/wheeler-cloud-development',
  },
  {
    title: 'AWS Community Builder Panel',
    venue: 'AWS re:Invent 2023',
    description:
      'Panel discussion on community building and knowledge sharing in the AWS ecosystem.',
    date: '2023-11-30',
    type: 'Panel',
    url: null,
  },
  {
    title: 'Serverless Architecture Patterns',
    venue: 'Local AWS User Group',
    description:
      'Presented common serverless patterns and best practices for building scalable applications.',
    date: '2023-09-15',
    type: 'Talk',
    url: null,
  },
]);

const communityInvolvement = ref([
  {
    organization: 'AWS Community Builders',
    role: 'Community Builder',
    description:
      'Selected member of the AWS Community Builders program, focusing on Serverless and DevOps.',
    icon: '☁️',
    activities: ['Content Creation', 'Mentoring', 'Speaking', 'Feedback'],
  },
  {
    organization: 'Virtual Coffee',
    role: 'Active Member',
    description:
      "Participating in an inclusive community of developers supporting each other's growth.",
    icon: '☕',
    activities: ['Mentoring', 'Networking', 'Lightning Talks', 'Code Reviews'],
  },
  {
    organization: 'Dev.to',
    role: 'Technical Writer',
    description:
      'Regular contributor writing about cloud technologies and development practices.',
    icon: '✍️',
    activities: ['Technical Articles', 'Tutorials', 'Community Engagement'],
  },
  {
    organization: 'Local Tech Meetups',
    role: 'Speaker & Organizer',
    description:
      'Helping organize and speak at local technology meetups and conferences.',
    icon: '🎪',
    activities: ['Speaking', 'Organizing', 'Networking', 'Workshops'],
  },
]);
</script>

<style scoped>
.community-planet {
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

.community-builder-section {
  margin-bottom: 4rem;
}

.builder-highlight {
  display: flex;
  justify-content: center;
}

.builder-badge {
  @apply planet-card;
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.1),
    rgba(22, 163, 74, 0.1)
  );
  border-color: rgba(34, 197, 94, 0.3);
}

.badge-icon {
  font-size: 4rem;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.badge-content {
  flex: 1;
}

.badge-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #22c55e;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.badge-description {
  color: #ccc;
  line-height: 1.5;
}

.contributions-section,
.blog-section,
.speaking-section,
.involvement-section {
  margin-bottom: 4rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 2rem;
  font-family: 'Orbitron', monospace;
}

.contributions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.contribution-card {
  @apply planet-card;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.contribution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2);
}

.contribution-icon {
  font-size: 2.5rem;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contribution-content {
  flex: 1;
}

.contribution-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.contribution-description {
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.contribution-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #22c55e;
  font-family: 'Orbitron', monospace;
}

.stat-label {
  font-size: 0.8rem;
  color: #ccc;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.blog-card {
  @apply planet-card;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2);
}

.blog-content {
  flex: 1;
  margin-bottom: 1rem;
}

.blog-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.blog-excerpt {
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.blog-date {
  font-size: 0.8rem;
  color: #999;
}

.blog-tags {
  display: flex;
  gap: 0.5rem;
}

.blog-tag {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.blog-actions {
  margin-top: auto;
}

.blog-link {
  color: #22c55e;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.blog-link:hover {
  text-decoration: underline;
}

.speaking-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.speaking-card {
  @apply planet-card;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.speaking-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2);
}

.speaking-content {
  flex: 1;
  margin-bottom: 1rem;
}

.speaking-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.speaking-venue {
  color: #22c55e;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.speaking-description {
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.speaking-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.speaking-date {
  font-size: 0.8rem;
  color: #999;
}

.speaking-type {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.speaking-link {
  color: #22c55e;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.speaking-link:hover {
  text-decoration: underline;
}

.involvement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.involvement-card {
  @apply planet-card;
  transition: all 0.3s ease;
}

.involvement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2);
}

.involvement-icon {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.involvement-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  text-align: center;
}

.involvement-role {
  color: #22c55e;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1rem;
}

.involvement-description {
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: center;
}

.involvement-activities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.activity-tag {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

@media (max-width: 768px) {
  .builder-badge {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .badge-icon {
    width: 80px;
    height: 80px;
    font-size: 3rem;
  }

  .contributions-grid {
    grid-template-columns: 1fr;
  }

  .contribution-card {
    flex-direction: column;
    text-align: center;
  }

  .blog-grid,
  .speaking-grid {
    grid-template-columns: 1fr;
  }

  .blog-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .speaking-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>
