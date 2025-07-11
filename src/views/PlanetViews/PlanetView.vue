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
              @click="$router.push('/')"
              class="btn-return"
            >
              ← Return to Solar System
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="planet-content">
      <div class="container mx-auto px-4 py-12">
        <component
          :is="planetComponent"
          v-if="planetComponent"
        />
        <div v-else class="planet-not-found">
          <h2>Planet Not Found</h2>
          <p>The planet you're looking for doesn't exist in this universe.</p>
          <button @click="$router.push('/')" class="btn-primary">
            Return to Solar System
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Planet } from '@/types'

// Planet components
import AWSPlanet from '@/components/Planets/AWSPlanet.vue'
import DevelopmentPlanet from '@/components/Planets/DevelopmentPlanet.vue'
import CommunityPlanet from '@/components/Planets/CommunityPlanet.vue'
import ExperiencePlanet from '@/components/Planets/ExperiencePlanet.vue'
import EducationPlanet from '@/components/Planets/EducationPlanet.vue'
import ProjectsPlanet from '@/components/Planets/ProjectsPlanet.vue'

interface Props {
  id: string
}

const props = defineProps<Props>()
const route = useRoute()

const planetId = computed(() => props.id || route.params.id as string)

const planetsData: Record<string, Planet> = {
  aws: {
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
  development: {
    id: 'development',
    name: 'Development',
    title: 'Code & Technologies',
    description: 'Discover my programming languages and development expertise',
    color: 'from-blue-500 to-purple-600',
    size: 90,
    orbitRadius: 230,
    orbitSpeed: 30,
    startAngle: 0,
    icon: '💻'
  },
  community: {
    id: 'community',
    name: 'Community',
    title: 'Building & Contributing',
    description: 'Learn about my community involvement and contributions',
    color: 'from-green-500 to-emerald-600',
    size: 80,
    orbitRadius: 290,
    orbitSpeed: 35,
    startAngle: 0,
    icon: '🤝'
  },
  experience: {
    id: 'experience',
    name: 'Experience',
    title: 'Professional Journey',
    description: 'View my work history and professional achievements',
    color: 'from-yellow-500 to-orange-500',
    size: 85,
    orbitRadius: 350,
    orbitSpeed: 25,
    startAngle: 0,
    icon: '🏢'
  },
  education: {
    id: 'education',
    name: 'Education',
    title: 'Learning & Growth',
    description: 'Explore my educational background and continuous learning',
    color: 'from-purple-500 to-pink-600',
    size: 70,
    orbitRadius: 410,
    orbitSpeed: 45,
    startAngle: 0,
    icon: '🎓'
  },
  projects: {
    id: 'projects',
    name: 'Projects',
    title: 'Portfolio & Work',
    description: 'Browse my projects and development portfolio',
    color: 'from-teal-500 to-cyan-600',
    size: 75,
    orbitRadius: 470,
    orbitSpeed: 38,
    startAngle: 0,
    icon: '🚀'
  }
}

const planetComponents = {
  aws: AWSPlanet,
  development: DevelopmentPlanet,
  community: CommunityPlanet,
  experience: ExperiencePlanet,
  education: EducationPlanet,
  projects: ProjectsPlanet
}

const planetData = computed(() => planetsData[planetId.value])
const planetComponent = computed(() => planetComponents[planetId.value as keyof typeof planetComponents])
</script>

<style scoped>
.planet-view {
  min-height: 100vh;
  padding-top: 2rem;
}

.planet-header {
  background: linear-gradient(135deg, rgba(75, 31, 142, 0.2), rgba(45, 19, 85, 0.2));
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
  color: #FFD700;
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
}

.btn-return:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
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
  color: #FFD700;
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