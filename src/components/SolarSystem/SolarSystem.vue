<template>
  <section class="solar-system-container" :class="{ 'system-frozen': isSystemFrozen }">
    <div class="solar-system" ref="solarSystemRef">
      <!-- Central Brand Logo -->
      <div class="sun">
        <img 
          src="/wheeleruniverse-logo.jpg" 
          alt="Wheeler Universe" 
          class="brand-logo"
        />
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
        top: `${tooltipData.y - 20}px`
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Planet } from '@/types'
import PlanetComponent from './PlanetComponent.vue'
import PlanetInfoModal from './PlanetInfoModal.vue'

const router = useRouter()
const solarSystemRef = ref<HTMLElement>()
const selectedPlanet = ref<Planet | null>(null)
const isSystemFrozen = ref(false)
const tooltipData = ref<{ show: boolean; planet: Planet; x: number; y: number } | null>(null)

const planets = ref<Planet[]>([
  {
    id: 'aws',
    name: 'AWS',
    title: 'Cloud Expertise',
    description: 'Explore my AWS certifications and cloud computing skills',
    color: 'from-orange-500 to-red-600',
    size: 120,
    orbitRadius: 170,
    orbitSpeed: 40,
    startAngle: 0,
    icon: '☁️'
  },
  {
    id: 'development',
    name: 'Development',
    title: 'Code & Technologies',
    description: 'Discover my programming languages and development expertise',
    color: 'from-blue-500 to-purple-600',
    size: 90,
    orbitRadius: 230,
    orbitSpeed: 30,
    startAngle: 60,
    icon: '💻'
  },
  {
    id: 'community',
    name: 'Community',
    title: 'Building & Contributing',
    description: 'Learn about my community involvement and contributions',
    color: 'from-green-500 to-emerald-600',
    size: 80,
    orbitRadius: 290,
    orbitSpeed: 35,
    startAngle: 120,
    icon: '🤝'
  },
  {
    id: 'experience',
    name: 'Experience',
    title: 'Professional Journey',
    description: 'View my work history and professional achievements',
    color: 'from-yellow-500 to-orange-500',
    size: 85,
    orbitRadius: 350,
    orbitSpeed: 25,
    startAngle: 180,
    icon: '🏢'
  },
  {
    id: 'education',
    name: 'Education',
    title: 'Learning & Growth',
    description: 'Explore my educational background and continuous learning',
    color: 'from-purple-500 to-pink-600',
    size: 70,
    orbitRadius: 410,
    orbitSpeed: 45,
    startAngle: 240,
    icon: '🎓'
  },
  {
    id: 'projects',
    name: 'Projects',
    title: 'Portfolio & Work',
    description: 'Browse my projects and development portfolio',
    color: 'from-teal-500 to-cyan-600',
    size: 75,
    orbitRadius: 470,
    orbitSpeed: 38,
    startAngle: 300,
    icon: '🚀'
  }
])

const navigateToPlanet = (planetId: string) => {
  router.push(`/planet/${planetId}`)
}

const handlePlanetClick = (planetId: string) => {
  const planet = planets.value.find(p => p.id === planetId)
  if (planet) {
    selectedPlanet.value = planet
  }
}

const handlePlanetHover = (isHovered: boolean) => {
  isSystemFrozen.value = isHovered
}

const handleTooltip = (data: { show: boolean; planet: Planet; x: number; y: number } | null) => {
  tooltipData.value = data
}

onMounted(() => {
  // Initialization complete
})
</script>

<style scoped>
.solar-system-container {
  min-height: 100vh;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  position: relative;
}

.system-frozen {
  background: radial-gradient(circle at center, 
    rgba(135, 206, 250, 0.05) 0%, 
    rgba(0, 191, 255, 0.03) 30%, 
    rgba(30, 144, 255, 0.02) 60%, 
    rgba(25, 25, 112, 0.01) 100%);
}

.system-frozen::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, 
    transparent 0%, 
    rgba(135, 206, 250, 0.03) 20%, 
    rgba(0, 191, 255, 0.02) 40%, 
    transparent 70%);
  animation: freeze-atmosphere 3s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}

@keyframes freeze-atmosphere {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.02);
  }
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
  color: #FFD700;
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


@media (max-width: 768px) {
  .solar-system-container {
    padding: 1rem;
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
</style>