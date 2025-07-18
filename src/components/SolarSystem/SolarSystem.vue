<template>
  <section
    class="solar-system-container"
    :class="{ 'navigating': isNavigating }"
  >
    <div class="solar-system" ref="solarSystemRef" :class="{ 'navigating': isNavigating }">
      <!-- Central Brand Logo -->
      <div class="sun">
        <img
          src="/wheeleruniverse-logo.jpg"
          alt="Wheeler Universe"
          class="brand-logo"
        />
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="loading-message">Loading planets...</div>

      <!-- Error state -->
      <div v-if="error" class="error-message">
        Error loading planets: {{ error }}
      </div>

      <!-- Planets (each creates its own orbit ring) -->
      <PlanetComponent
        v-for="planet in planets"
        :key="planet.id"
        :planet="planet"
        @click="handlePlanetClick"
        @hover="handlePlanetHover"
        @tooltip="handleTooltip"
      />
    </div>

    <!-- Floating Tooltip -->
    <div
      v-if="tooltipData"
      class="floating-tooltip"
      :style="{
        left: `${tooltipData.x}px`,
        top: `${tooltipData.y - 20}px`,
      }"
    >
      <div class="tooltip-content">
        <h3>{{ tooltipData.planet.title }}</h3>
        <p>{{ tooltipData.planet.description }}</p>
      </div>
      <div class="tooltip-arrow"></div>
    </div>

    <!-- Planet Info Modal -->
    <PlanetInfoModal
      v-if="selectedPlanet"
      :planet="selectedPlanet"
      @close="selectedPlanet = null"
      @navigate="navigateToPlanet"
    />
  </section>
</template>

<script setup lang="ts">
import type { Planet } from '@/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PlanetComponent from './PlanetComponent.vue';
import PlanetInfoModal from './PlanetInfoModal.vue';
const router = useRouter();
const solarSystemRef = ref<HTMLElement>();
const selectedPlanet = ref<Planet | null>(null);
const isSystemFrozen = ref(false);

const emit = defineEmits<{
  'system-frozen': [frozen: boolean];
}>();
const tooltipData = ref<{
  show: boolean;
  planet: Planet;
  x: number;
  y: number;
} | null>(null);

const planets = ref<Planet[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const isNavigating = ref(false);

const navigateToPlanet = async (planetId: string) => {
  isNavigating.value = true;
  
  // Small delay to allow transition to show
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Navigate to planet
  router.push(`/planet/${planetId}`);
};

const handlePlanetClick = (planetId: string) => {
  const planet = planets.value.find(p => p.id === planetId);
  if (planet) {
    selectedPlanet.value = planet;
  }
};

const handlePlanetHover = (isHovered: boolean) => {
  isSystemFrozen.value = isHovered;
  emit('system-frozen', isHovered);
};

const handleTooltip = (
  data: { show: boolean; planet: Planet; x: number; y: number } | null
) => {
  tooltipData.value = data;
};

const randomizePlanetStartAngles = (planets: Planet[]) => {
  return planets.map(planet => {
    const randomAngle = Math.random() * 360;
    return {
      ...planet,
      startAngle: randomAngle,
    };
  });
};

const loadPlanetsData = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const response = await fetch('/portfolio-config.json');
    if (!response.ok) {
      throw new Error(`Failed to load config: ${response.statusText}`);
    }

    const config = await response.json();
    const planetsData = config.planets || [];

    // Randomize starting angles for each page load
    planets.value = randomizePlanetStartAngles(planetsData);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load planets';
    console.error('Error loading planets:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPlanetsData();
});
</script>

<style scoped>
.solar-system-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  position: relative;
  overflow: visible;
}

.solar-system-container.navigating {
  filter: blur(3px);
  opacity: 0.7;
  transform: scale(0.95);
}

.solar-system {
  transition: all 0.5s ease;
}

.solar-system.navigating {
  pointer-events: none;
}


.floating-tooltip {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  transform: translateX(-50%);
  animation: tooltip-appear 0.3s ease;
}

.tooltip-content {
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  backdrop-filter: blur(20px);
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(135, 206, 250, 0.3);
  max-width: 280px;
  text-align: center;
}

.tooltip-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: #ffd700;
  font-family: 'Orbitron', monospace;
}

.tooltip-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #e5e5e5;
  line-height: 1.4;
}

.tooltip-arrow {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(0, 0, 0, 0.95);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes tooltip-appear {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.loading-message,
.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  font-family: 'Orbitron', monospace;
}

.error-message {
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .solar-system-container {
    min-height: 80vh; /* Reduced height for mobile to accommodate smaller orbits */
  }

  .tooltip-content {
    max-width: 220px;
    padding: 0.75rem 1rem;
  }

  .tooltip-content h3 {
    font-size: 0.9rem;
  }

  .tooltip-content p {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .solar-system-container {
    min-height: 70vh; /* Even more compact on small mobile */
  }
}
</style>
