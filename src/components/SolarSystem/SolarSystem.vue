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

const handlePlanetHover = (isHovered: boolean) => {
  isSystemFrozen.value = isHovered
}

onMounted(() => {
  // Add any initialization logic here
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