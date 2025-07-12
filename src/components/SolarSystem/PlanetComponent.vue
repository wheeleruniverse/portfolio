<template>
  <!-- Orbit Ring -->
  <div 
    class="orbit-ring"
    :style="{ 
      width: `${planet.orbitRadius * 2}px`, 
      height: `${planet.orbitRadius * 2}px`
    }"
  >
  </div>
  
  <!-- Planet on Orbit -->
  <div 
    class="planet-container"
    :class="{ 'frozen': isHovered }"
    :style="{ 
      width: `${planet.orbitRadius * 2}px`, 
      height: `${planet.orbitRadius * 2}px`,
      animationDuration: `${planet.orbitSpeed}s`,
      transform: `translate(-50%, -50%) rotate(${planet.startAngle}deg)`
    }"
  >
    <div
      ref="planetRef"
      class="planet"
      :class="[`bg-gradient-to-br ${planet.color}`, { 'frozen': isHovered }]"
      :style="{ 
        width: `${planetSize}px`, 
        height: `${planetSize}px`,
        zIndex: planetZIndex,
        '--planet-size': `${planetSize}px`
      }"
      @click="handleClick"
      @mouseenter="handleMouseEnterUpdated"
      @mouseleave="handleMouseLeaveUpdated"
      :aria-label="`Navigate to ${planet.name} section`"
      role="button"
      tabindex="0"
      @keydown.enter="handleClick"
      @keydown.space="handleClick"
    >
      <div 
        class="planet-content counter-rotate"
        :class="{ 'frozen': isHovered }"
        :style="{
          animationDuration: `${planet.orbitSpeed}s`
        }"
      >
        <div class="planet-icon">{{ planet.icon }}</div>
        <div class="planet-name">{{ planet.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Planet } from '@/types'

interface Props {
  planet: Planet
}

const props = defineProps<Props>()
const emit = defineEmits<{
  click: [planetId: string]
  hover: [planet: Planet | null]
}>()

const planetRef = ref<HTMLElement>()
const isHovered = ref(false)

// Calculate planet size based on text length and minimum size
const planetSize = computed(() => {
  const textLength = props.planet.name.length
  const baseSize = Math.max(props.planet.size, 90) // Minimum 90px
  
  // Responsive text sizing: more padding for longer text
  let textPadding = 50 // Base padding
  if (textLength > 6) {
    textPadding += (textLength - 6) * 12 // 12px per extra character
  } else if (textLength > 4) {
    textPadding += (textLength - 4) * 8 // 8px per character over 4
  }
  
  const calculatedSize = Math.max(baseSize, textPadding + 50)
  
  // Ensure minimum readable size for long names
  if (textLength >= 10) {
    return Math.max(calculatedSize, 140) // Minimum 140px for very long names
  } else if (textLength >= 8) {
    return Math.max(calculatedSize, 120) // Minimum 120px for long names
  }
  
  return calculatedSize
})

// Calculate z-index based on orbit radius (outer planets on top)
const planetZIndex = computed(() => {
  return Math.floor(props.planet.orbitRadius / 10)
})

const handleClick = (event: Event) => {
  event.stopPropagation()
  emit('click', props.planet.id)
}

const handleMouseEnterUpdated = () => {
  isHovered.value = true
  emit('hover', props.planet)
}

const handleMouseLeaveUpdated = () => {
  isHovered.value = false
  emit('hover', null)
}
</script>

<style scoped>
.orbit-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
}

.planet-container {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: orbit linear infinite;
}

.planet-container.frozen {
  animation-play-state: paused;
}

.planet {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-50%, -50%);
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

.planet.frozen {
  filter: drop-shadow(0 0 20px rgba(135, 206, 250, 0.6)) 
          drop-shadow(0 0 30px rgba(173, 216, 230, 0.4))
          drop-shadow(0 0 40px rgba(176, 224, 230, 0.3));
  animation: freeze-pulse 2s ease-in-out infinite alternate;
}

.planet:hover {
  transform: translate(-50%, -50%) scale(1.15);
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

.planet-container.frozen {
  animation-play-state: paused;
}

.counter-rotate {
  animation: counter-rotate linear infinite;
}

.counter-rotate.frozen {
  animation-play-state: paused;
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

@keyframes orbit {
  0% { 
    transform: translate(-50%, -50%) rotate(0deg); 
  }
  100% { 
    transform: translate(-50%, -50%) rotate(360deg); 
  }
}

@keyframes counter-rotate {
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(-360deg); 
  }
}

@keyframes freeze-pulse {
  0% {
    filter: drop-shadow(0 0 20px rgba(135, 206, 250, 0.6)) 
            drop-shadow(0 0 30px rgba(173, 216, 230, 0.4))
            drop-shadow(0 0 40px rgba(176, 224, 230, 0.3));
  }
  100% {
    filter: drop-shadow(0 0 30px rgba(135, 206, 250, 0.8)) 
            drop-shadow(0 0 50px rgba(173, 216, 230, 0.6))
            drop-shadow(0 0 70px rgba(176, 224, 230, 0.5));
  }
}

@media (max-width: 768px) {
  .planet-icon {
    font-size: 1.1rem;
  }
  
  .planet-name {
    font-size: 0.6rem;
    line-height: 1.1;
    padding: 0 4px;
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

@media (max-width: 480px) {
  .planet-icon {
    font-size: 1rem;
  }
  
  .planet-name {
    font-size: 0.55rem;
    line-height: 1;
  }
}
</style>