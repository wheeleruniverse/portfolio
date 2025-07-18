<template>
  <div class="planet-view">
    <div class="planet-header">
      <div class="container mx-auto px-4 py-8">
        <div class="planet-hero">
          <div
            class="planet-large"
            :class="`bg-gradient-to-br ${planetData?.color}`"
          >
            <span class="planet-icon">{{ planetData?.icon }}</span>
          </div>
          <div class="planet-info">
            <h1 class="planet-title">{{ planetData?.title }}</h1>
            <p class="planet-description">{{ planetData?.description }}</p>
            <button
              @click="handleReturnToSolarSystem"
              class="btn-return"
              :class="{ navigating: isNavigating }"
              :disabled="isNavigating"
            >
              <span v-if="!isNavigating">← Return to Solar System</span>
              <span v-else class="loading-content">
                <span class="spinner"></span>
                Returning...
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="planet-content">
      <div class="container mx-auto px-4 py-12">
        <component :is="planetComponent" v-if="planetComponent" />
        <div v-else class="planet-not-found">
          <h2>Planet Not Found</h2>
          <p>The planet you're looking for doesn't exist in this universe.</p>
          <button
            @click="handleReturnToSolarSystem"
            class="btn-primary"
            :disabled="isNavigating"
          >
            <span v-if="!isNavigating">Return to Solar System</span>
            <span v-else class="loading-content">
              <span class="spinner"></span>
              Returning...
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getPlanets,
  usePortfolioConfig,
} from '@/composables/usePortfolioConfig';
import type { Planet } from '@/types';
import { computed, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Planet components
import AWSPlanet from '@/components/Planets/AWSPlanet.vue';
import CommunityPlanet from '@/components/Planets/CommunityPlanet.vue';
import DevelopmentPlanet from '@/components/Planets/DevelopmentPlanet.vue';
import EducationPlanet from '@/components/Planets/EducationPlanet.vue';
import ExperiencePlanet from '@/components/Planets/ExperiencePlanet.vue';
import ProjectsPlanet from '@/components/Planets/ProjectsPlanet.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const route = useRoute();
const router = useRouter();
const isNavigating = ref(false);
usePortfolioConfig();

const handleReturnToSolarSystem = async () => {
  isNavigating.value = true;

  // Add page fade-out effect
  document.body.classList.add('page-transitioning');

  // Wait for transition to complete
  await new Promise(resolve => setTimeout(resolve, 600));

  // Navigate to home
  router.push('/');
};

const planetId = computed(() => props.id || (route.params.id as string));

const planetsData = computed(() => {
  const planets = getPlanets();
  const planetsMap: Record<string, Planet> = {};
  planets.forEach(planet => {
    planetsMap[planet.id] = planet;
  });
  return planetsMap;
});

const planetComponents = {
  aws: AWSPlanet,
  development: DevelopmentPlanet,
  community: CommunityPlanet,
  experience: ExperiencePlanet,
  education: EducationPlanet,
  projects: ProjectsPlanet,
};

const planetData = computed(() => planetsData.value[planetId.value]);
const planetComponent = computed(
  () => planetComponents[planetId.value as keyof typeof planetComponents]
);

// Watch for route changes to reset navigation state
watch(
  route,
  () => {
    isNavigating.value = false;
    document.body.classList.remove('page-transitioning');
  },
  { immediate: true }
);

onUnmounted(() => {
  // Clean up any transition class that might be left
  document.body.classList.remove('page-transitioning');
});
</script>

<style scoped>
.planet-view {
  min-height: 100vh;
  padding-top: 2rem;
}

.planet-header {
  background: linear-gradient(
    135deg,
    rgba(75, 31, 142, 0.2),
    rgba(45, 19, 85, 0.2)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.planet-hero {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.planet-large {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.planet-info {
  flex: 1;
}

.planet-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.planet-description {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.btn-return {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-return:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-return:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-return.navigating {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(0);
}

.loading-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.planet-content {
  padding: 2rem 0;
}

.planet-not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.planet-not-found h2 {
  font-size: 2rem;
  color: #ffd700;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

.planet-not-found p {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .planet-hero {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .planet-large {
    width: 120px;
    height: 120px;
    font-size: 2.5rem;
  }

  .planet-title {
    font-size: 2rem;
  }

  .planet-description {
    font-size: 1rem;
  }
}
</style>
