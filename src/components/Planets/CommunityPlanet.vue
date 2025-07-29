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
        <a
          v-if="awsCommunityBuildersUrl"
          :href="awsCommunityBuildersUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="builder-badge-link"
        >
          <div class="builder-badge">
            <div class="badge-icon">🌟</div>
            <div class="badge-content">
              <h3 class="badge-title">AWS Community Builder</h3>
              <p class="badge-description">
                Recognized by AWS for contributions to the cloud community
                through content creation, mentorship, and knowledge sharing.
              </p>
            </div>
          </div>
        </a>
        <div v-else class="builder-badge">
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

    <section class="blog-section" v-if="blogPosts.length > 0">
      <h3 class="subsection-title">Recent Blog Posts</h3>
      <div class="blog-grid">
        <a
          v-for="post in blogPosts"
          :key="post.id"
          :href="post.url"
          target="_blank"
          rel="noopener noreferrer"
          class="blog-card-link"
        >
          <div class="blog-card">
            <div class="blog-content">
              <h4 class="blog-title">{{ post.title }}</h4>
              <p class="blog-excerpt">{{ post.excerpt }}</p>
              <div class="blog-tags" v-if="post.tags && post.tags.length > 0">
                <span v-for="tag in post.tags" :key="tag" class="blog-tag">
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="blog-footer">
              <div class="blog-meta">
                <div class="blog-meta-left">
                  <span class="blog-date">{{ post.publishedAt }}</span>
                </div>
                <div class="blog-meta-right">
                  <span class="blog-link"> Read More → </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>

    <section class="speaking-section" v-if="speakingEvents.length > 0">
      <h3 class="subsection-title">Speaking & Interviews</h3>
      <div class="speaking-grid">
        <a
          v-for="event in speakingEventsWithUrl"
          :key="event.id"
          :href="event.url"
          target="_blank"
          rel="noopener noreferrer"
          class="speaking-card-link"
        >
          <div class="speaking-card">
            <div class="speaking-content">
              <h4 class="speaking-title">{{ event.title }}</h4>
              <p class="speaking-venue">{{ event.venue }}</p>
              <p class="speaking-description">{{ event.description }}</p>
            </div>
            <div class="speaking-footer">
              <div class="speaking-meta">
                <div class="speaking-meta-left">
                  <span class="speaking-date">{{ event.date }}</span>
                  <span class="speaking-type">{{ event.type }}</span>
                </div>
                <div class="speaking-meta-right">
                  <span class="speaking-link"> Watch Now → </span>
                </div>
              </div>
            </div>
          </div>
        </a>
        <div
          v-for="event in speakingEventsWithoutUrl"
          :key="event.id"
          class="speaking-card"
        >
          <div class="speaking-content">
            <h4 class="speaking-title">{{ event.title }}</h4>
            <p class="speaking-venue">{{ event.venue }}</p>
            <p class="speaking-description">{{ event.description }}</p>
          </div>
          <div class="speaking-footer">
            <div class="speaking-meta">
              <div class="speaking-meta-left">
                <span class="speaking-date">{{ event.date }}</span>
                <span class="speaking-type">{{ event.type }}</span>
              </div>
              <div class="speaking-meta-right">
                <!-- No link for events without URL -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="involvement-section" v-if="communityInvolvement.length > 0">
      <h3 class="subsection-title">Community Involvement</h3>
      <div class="involvement-grid">
        <a
          v-for="involvement in communityInvolvementWithUrl"
          :key="involvement.id"
          :href="involvement.url"
          target="_blank"
          rel="noopener noreferrer"
          class="involvement-card-link"
        >
          <div class="involvement-card">
            <div class="involvement-icon">{{ involvement.icon }}</div>
            <div class="involvement-content">
              <h4 class="involvement-title">{{ involvement.organization }}</h4>
              <p class="involvement-role">{{ involvement.role }}</p>
              <p class="involvement-description">
                {{ involvement.description }}
              </p>
            </div>
            <div class="involvement-footer">
              <div class="involvement-meta">
                <div class="involvement-meta-left">
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
                <div class="involvement-meta-right">
                  <span class="involvement-link"> View → </span>
                </div>
              </div>
            </div>
          </div>
        </a>
        <div
          v-for="involvement in communityInvolvementWithoutUrl"
          :key="involvement.id"
          class="involvement-card"
        >
          <div class="involvement-icon">{{ involvement.icon }}</div>
          <div class="involvement-content">
            <h4 class="involvement-title">{{ involvement.organization }}</h4>
            <p class="involvement-role">{{ involvement.role }}</p>
            <p class="involvement-description">{{ involvement.description }}</p>
          </div>
          <div class="involvement-footer">
            <div class="involvement-meta">
              <div class="involvement-meta-left">
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
              <div class="involvement-meta-right">
                <!-- No link for involvement without URL -->
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
import type { BlogPost } from '@/types';
import { computed, onMounted, ref } from 'vue';

const contributions = ref([
  {
    title: 'Technical Blog Posts',
    description: 'Sharing insights on AWS, development, and cloud architecture',
    icon: '📝',
    count: '30+',
    metric: 'Articles',
  },
  {
    title: 'Community Mentorship',
    description:
      'Helping developers transition to cloud and advance their careers',
    icon: '🤝',
    count: '10+',
    metric: 'Mentees',
  },
  {
    title: 'Speaking Events',
    description: 'Presenting at conferences, meetups, and community events',
    icon: '🎤',
    count: '10+',
    metric: 'Talks',
  },
]);

const blogPosts = ref<BlogPost[]>([]);
const speakingEvents = ref<any[]>([]);
const communityInvolvement = ref<any[]>([]);
const awsCommunityBuildersUrl = ref<string>('');

// Computed properties to separate items with and without URLs
const speakingEventsWithUrl = computed(() =>
  speakingEvents.value.filter(event => event.url)
);
const speakingEventsWithoutUrl = computed(() =>
  speakingEvents.value.filter(event => !event.url)
);
const communityInvolvementWithUrl = computed(() =>
  communityInvolvement.value.filter(item => item.url)
);
const communityInvolvementWithoutUrl = computed(() =>
  communityInvolvement.value.filter(item => !item.url)
);

const { config } = usePortfolioConfig();

onMounted(async () => {
  if (config.value?.community) {
    const communityConfig = config.value.community;

    // Transform blog posts data to match BlogPost interface
    if ((communityConfig as any).blogPosts) {
      blogPosts.value = (communityConfig as any).blogPosts.map((post: any) => ({
        id: post.id,
        title: post.title,
        excerpt: post.description,
        publishedAt: post.date,
        url: post.url,
        tags: [], // No tags in config, so empty array
      }));
    }

    // Load speaking events
    if ((communityConfig as any).speakingEvents) {
      speakingEvents.value = (communityConfig as any).speakingEvents;
    }

    // Load community involvement
    if ((communityConfig as any).communityInvolvement) {
      communityInvolvement.value = (
        communityConfig as any
      ).communityInvolvement;

      // Extract AWS Community Builders URL for the badge
      const awsBuilderEntry = (
        communityConfig as any
      ).communityInvolvement.find(
        (item: any) => item.id === 'aws-community-builders'
      );
      if (awsBuilderEntry && awsBuilderEntry.url) {
        awsCommunityBuildersUrl.value = awsBuilderEntry.url;
      }
    }
  }
});
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

.builder-badge-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: all 0.3s ease;
}

.builder-badge-link:hover {
  transform: translateY(-2px);
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
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
}

.blog-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.blog-card {
  @apply planet-card;
  display: flex;
  flex-direction: column;
  min-height: 270px;
  transition: all 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2);
}

.blog-content {
  flex: 1;
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

.blog-footer {
  margin-top: auto;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-meta-left {
  display: flex;
  align-items: center;
}

.blog-meta-right {
  display: flex;
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
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
}

.speaking-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.speaking-card {
  @apply planet-card;
  display: flex;
  flex-direction: column;
  min-height: 370px;
  transition: all 0.3s ease;
}

.speaking-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2);
}

.speaking-content {
  flex: 1;
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

.speaking-footer {
  margin-top: auto;
}

.speaking-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.speaking-meta-left {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.speaking-meta-right {
  display: flex;
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
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
}

.involvement-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.involvement-card {
  @apply planet-card;
  display: flex;
  flex-direction: column;
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

.involvement-footer {
  margin-top: auto;
}

.involvement-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.involvement-meta-left {
  display: flex;
  flex: 1;
}

.involvement-meta-right {
  display: flex;
  align-items: center;
}

.involvement-activities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.activity-tag {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.involvement-link {
  color: #22c55e;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.involvement-link:hover {
  text-decoration: underline;
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
  .speaking-grid,
  .involvement-grid {
    grid-template-columns: 1fr;
  }

  .blog-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .blog-meta-left {
    align-self: flex-start;
  }

  .blog-meta-right {
    align-self: flex-start;
  }

  .speaking-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .speaking-meta-left {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .speaking-meta-right {
    align-self: flex-start;
  }

  .involvement-meta {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .involvement-meta-left {
    align-self: center;
  }

  .involvement-meta-right {
    align-self: center;
  }
}
</style>
