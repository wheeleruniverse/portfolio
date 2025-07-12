<template>
  <section class="solar-system-container">
    <div class="solar-system" ref="solarSystemRef" :class="{ 'bottom-sheet-active': !!hoveredPlanet }">
      <!-- Central Sun with Brand Logo -->
      <div class="sun">
        <div class="brand-logo">
          <img 
            src="/brand/logo-03.jpg" 
            alt="Wheeler Universe Logo" 
            class="logo-image"
          />
          <div class="solar-flares"></div>
        </div>
      </div>
      
      <!-- Planets (each creates its own orbit ring) -->
      <PlanetComponent
        v-for="planet in planets"
        :key="planet.id"
        :planet="planet"
        @click="navigateToPlanet(planet.id)"
        @hover="handlePlanetHover"
      />
    </div>
    
    <!-- Planet Info Modal -->
    <PlanetInfoModal
      v-if="selectedPlanet"
      :planet="selectedPlanet"
      @close="selectedPlanet = null"
      @navigate="navigateToPlanet"
    />
    
    <!-- Bottom Sheet for Planet Info -->
    <BottomSheet
      :planet="hoveredPlanet"
      :is-visible="!!hoveredPlanet"
      @navigate="navigateToPlanet"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Planet } from '@/types'
import PlanetComponent from './PlanetComponent.vue'
import PlanetInfoModal from './PlanetInfoModal.vue'
import BottomSheet from './BottomSheet.vue'

const router = useRouter()
const solarSystemRef = ref<HTMLElement>()
const selectedPlanet = ref<Planet | null>(null)
const hoveredPlanet = ref<Planet | null>(null)
let hoverTimeout: NodeJS.Timeout | null = null

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

const handlePlanetHover = (planet: Planet | null) => {
  // Clear any existing timeout
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }
  
  if (planet) {
    // Immediately show on hover
    hoveredPlanet.value = planet
  } else {
    // Delay hiding to prevent flicker
    hoverTimeout = setTimeout(() => {
      hoveredPlanet.value = null
    }, 200) // 200ms delay before hiding
  }
}

const navigateToPlanet = (planetId: string) => {
  router.push(`/planet/${planetId}`)
}

onMounted(() => {
  // Add any initialization logic here
})

onUnmounted(() => {
  // Clean up timeout
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
  }
})
</script>

<style scoped>
.solar-system-container {
  min-height: 100vh;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun-text {
  text-align: center;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .solar-system-container {
    padding: 1rem;
  }
}
</style>