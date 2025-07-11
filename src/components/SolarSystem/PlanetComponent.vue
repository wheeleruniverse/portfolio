<template>
  <div 
    class="planet-orbit"
    :style="{ 
      width: `${planet.orbitRadius * 2}px`, 
      height: `${planet.orbitRadius * 2}px`,
      animationDuration: `${planet.orbitSpeed}s`,
      transform: `translate(-50%, -50%) rotate(${planet.startAngle}deg)`
    }"
  >
    <div
      class="planet"
      :class="[
        `planet-${planet.id}`,
        `bg-gradient-to-br ${planet.color}`
      ]"
      :style="{ 
        width: `${planet.size}px`, 
        height: `${planet.size}px`,
        transform: `translateX(${planet.orbitRadius}px) rotate(-${planet.startAngle}deg)`,
        '--orbit-radius': `${planet.orbitRadius}px`,
        '--counter-rotation': `-${planet.startAngle}deg`
      }"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      :aria-label="`Navigate to ${planet.name} section`"
      role="button"
      tabindex="0"
      @keydown.enter="handleClick"
      @keydown.space="handleClick"
    >
      <div class="planet-content">
        <div class="planet-icon">{{ planet.icon }}</div>
        <div class="planet-name">{{ planet.name }}</div>
      </div>
      
      <!-- Tooltip -->
      <div
        v-if="showTooltip"
        class="planet-tooltip"
        :class="{ 'show': showTooltip }"
      >
        <h3>{{ planet.title }}</h3>
        <p>{{ planet.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Planet } from '@/types'

interface Props {
  planet: Planet
}

const props = defineProps<Props>()
const emit = defineEmits<{
  click: [planetId: string]
}>()

const showTooltip = ref(false)

const handleClick = () => {
  emit('click', props.planet.id)
}

const handleMouseEnter = () => {
  showTooltip.value = true
}

const handleMouseLeave = () => {
  showTooltip.value = false
}
</script>

<style scoped>
.planet-orbit {
  position: absolute;
  border-radius: 50%;
  animation: orbit linear infinite;
  top: 50%;
  left: 50%;
}

.planet {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.planet:hover {
  transform: translateX(var(--orbit-radius)) rotate(var(--counter-rotation)) scale(1.15);
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
}

.planet:focus {
  outline: 2px solid #FFD700;
  outline-offset: 4px;
}

.planet-content {
  text-align: center;
  position: relative;
}

.planet-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.planet-name {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.planet-tooltip {
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  min-width: 200px;
  white-space: normal;
}

.planet-tooltip.show {
  opacity: 1;
  visibility: visible;
}

.planet-tooltip h3 {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #FFD700;
}

.planet-tooltip p {
  margin: 0;
  font-size: 0.75rem;
  color: #ccc;
}

.planet-tooltip::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid rgba(0, 0, 0, 0.9);
}

@keyframes orbit {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@media (max-width: 768px) {
  .planet-icon {
    font-size: 1.2rem;
  }
  
  .planet-name {
    font-size: 0.6rem;
  }
  
  .planet-tooltip {
    min-width: 150px;
    font-size: 0.75rem;
  }
  
  .planet-tooltip h3 {
    font-size: 0.8rem;
  }
  
  .planet-tooltip p {
    font-size: 0.7rem;
  }
}
</style>