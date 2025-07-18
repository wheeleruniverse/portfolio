<template>
  <div class="home-view" :class="{ 'system-frozen': isSystemFrozen }">
    <section class="hero-section relative">
      <div class="container mx-auto px-4 py-20 text-center">
        <h1
          class="text-6xl md:text-8xl font-orbitron font-bold mb-6 text-space-gold"
        >
          Wheeler Universe
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-gray-300">
          Explore the cosmos of cloud expertise, development skills, and
          community contributions
        </p>
        <div
          class="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
        >
          <div class="stat-card">
            <div class="stat-number">{{ totalCertifications }}</div>
            <div class="stat-label">Active Certifications</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">8+</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">100%</div>
            <div class="stat-label">Remote</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">Community</div>
            <div class="stat-label">Builder</div>
          </div>
        </div>
      </div>
    </section>

    <SolarSystem @system-frozen="handleSystemFrozen" />
  </div>
</template>

<script setup lang="ts">
import SolarSystem from '@/components/SolarSystem/SolarSystem.vue';
import { computed, ref } from 'vue';
import portfolioData from '../../public/portfolio-config.json';

const isSystemFrozen = ref(false);

const handleSystemFrozen = (frozen: boolean) => {
  isSystemFrozen.value = frozen;
};

const isActiveCertification = (certification: any) => {
  if (!certification.expiryDate) {
    return true; // No expiry date means it doesn't expire
  }

  const today = new Date();
  const expiryDate = new Date(certification.expiryDate);

  return expiryDate >= today;
};

const totalCertifications = computed(() => {
  return portfolioData.certifications.filter(isActiveCertification).length;
});
</script>

<style scoped>
.hero-section {
  min-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-grid {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4;
}

.stat-card {
  @apply bg-space-navy border border-space-purple rounded-lg p-4 text-center;
  backdrop-filter: blur(10px);
  border-color: rgba(255, 255, 255, 0.1);
}

.stat-number {
  @apply text-2xl font-bold text-space-gold font-orbitron;
}

.stat-label {
  @apply text-sm text-gray-300 mt-1;
}

.system-frozen {
  background: radial-gradient(
    circle at center,
    rgba(135, 206, 250, 0.05) 0%,
    rgba(0, 191, 255, 0.03) 30%,
    rgba(30, 144, 255, 0.02) 60%,
    rgba(25, 25, 112, 0.01) 100%
  );
}

.system-frozen::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    rgba(135, 206, 250, 0.03) 20%,
    rgba(0, 191, 255, 0.02) 40%,
    transparent 70%
  );
  animation: freeze-atmosphere 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes freeze-atmosphere {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.02);
  }
}
</style>
