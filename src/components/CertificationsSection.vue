<template>
  <section class="certifications-section">
    <h3 class="subsection-title">{{ title }}</h3>
    <p v-if="description" class="section-description">{{ description }}</p>

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
        :class="{ expired: isExpired(cert) }"
      >
        <div class="cert-badge">
          <div class="cert-icon" :class="{ 'expired-icon': isExpired(cert) }">
            {{ isExpired(cert) ? '⏰' : '🏆' }}
          </div>
        </div>
        <div class="cert-content">
          <h4 class="cert-name">{{ cert.name }}</h4>
          <p class="cert-issuer">{{ cert.issuer }}</p>
          <p class="cert-level">{{ cert.level }}</p>
          <p class="cert-date">Issued: {{ cert.issueDate }}</p>
          <p class="cert-expiry" v-if="cert.expiryDate">
            <span :class="{ 'expired-text': isExpired(cert) }">
              {{ isExpired(cert) ? 'Expired:' : 'Expires:' }}
              {{ cert.expiryDate }}
            </span>
          </p>
          <div class="cert-actions">
            <a
              v-if="cert.credlyUrl"
              :href="cert.credlyUrl"
              class="cert-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Credential
            </a>
            <span v-if="isExpired(cert)" class="expired-badge"> Expired </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Certification } from '@/types';
import { computed } from 'vue';

interface Props {
  title: string;
  description?: string;
  certifications: Certification[];
  isLoading: boolean;
  error: string | null;
}

const props = defineProps<Props>();

const isExpired = (cert: Certification): boolean => {
  if (!cert.expiryDate) return false;

  const expiryDate = new Date(cert.expiryDate);
  const today = new Date();

  return expiryDate < today;
};

// Sort certifications with complex multi-level sorting
const certifications = computed(() => {
  // Define level hierarchy
  const levelOrder = ['Professional', 'Specialty', 'Associate', 'Foundational'];

  const getLevelPriority = (level: string): number => {
    const index = levelOrder.indexOf(level);
    return index === -1 ? 999 : index; // Unknown levels go to end
  };

  return [...props.certifications].sort((a, b) => {
    const aExpired = isExpired(a);
    const bExpired = isExpired(b);

    // 1. First sort: Active vs Expired (active first)
    if (aExpired !== bExpired) {
      return aExpired ? 1 : -1;
    }

    // 2. Second sort: Level priority (Professional > Specialty > Associate > Foundational)
    const aLevelPriority = getLevelPriority(a.level);
    const bLevelPriority = getLevelPriority(b.level);

    if (aLevelPriority !== bLevelPriority) {
      return aLevelPriority - bLevelPriority;
    }

    // 3. Third sort: Vendor alphabetically
    const vendorCompare = a.vendor.localeCompare(b.vendor);
    if (vendorCompare !== 0) {
      return vendorCompare;
    }

    // 4. Fourth sort: Name alphabetically
    return a.name.localeCompare(b.name);
  });
});
</script>

<style scoped>
.certifications-section {
  margin-bottom: 4rem;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

.section-description {
  text-align: center;
  color: #ccc;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
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
  position: relative;
}

.certification-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
}

.certification-card.expired {
  opacity: 0.7;
  border-color: rgba(255, 255, 255, 0.1);
}

.certification-card.expired:hover {
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
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
  transition: all 0.3s ease;
}

.cert-icon.expired-icon {
  background: linear-gradient(135deg, #666, #999);
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

.cert-date {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.25rem;
}

.cert-expiry {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.5rem;
}

.expired-text {
  color: #ff6b6b;
  font-weight: 600;
}

.cert-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cert-link {
  color: #ffd700;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.cert-link:hover {
  text-decoration: underline;
}

.expired-badge {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

@media (max-width: 768px) {
  .certifications-grid {
    grid-template-columns: 1fr;
  }

  .certification-card {
    flex-direction: column;
    text-align: center;
  }

  .cert-actions {
    justify-content: center;
  }
}
</style>
