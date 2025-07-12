<template>
  <div 
    class="bottom-sheet-container"
    :class="{ 'visible': isVisible, 'chilled': isVisible }"
  >
    <div class="bottom-sheet">
      <div class="sheet-handle"></div>
      
      <div v-if="planet" class="sheet-content">
        <div class="planet-info">
          <div class="planet-header">
            <div class="planet-icon-large">{{ planet.icon }}</div>
            <div class="planet-details">
              <h2 class="planet-title">{{ planet.title }}</h2>
              <p class="planet-description">{{ planet.description }}</p>
            </div>
          </div>
          
          <div class="action-buttons">
            <button 
              @click="$emit('navigate', planet.id)"
              class="explore-button"
            >
              Explore {{ planet.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Planet } from '@/types'

interface Props {
  planet: Planet | null
  isVisible: boolean
}

defineProps<Props>()
defineEmits<{
  navigate: [planetId: string]
}>()
</script>

<style scoped>
.bottom-sheet-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transform: translateY(100%);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: none;
}

.bottom-sheet-container.visible {
  transform: translateY(0);
  pointer-events: all;
}

.bottom-sheet-container.chilled {
  filter: drop-shadow(0 -10px 30px rgba(135, 206, 250, 0.6)) 
          drop-shadow(0 -20px 50px rgba(173, 216, 230, 0.4))
          drop-shadow(0 -30px 70px rgba(176, 224, 230, 0.3));
  animation: chill-pulse 2s ease-in-out infinite alternate;
}

.bottom-sheet {
  background: rgba(53, 6, 79, 0.95);
  backdrop-filter: blur(20px);
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  border: 1px solid rgba(244, 208, 63, 0.3);
  border-bottom: none;
  min-height: 200px;
  max-height: 35vh;
  overflow-y: auto;
}

.sheet-handle {
  width: 40px;
  height: 4px;
  background: rgba(244, 208, 63, 0.5);
  border-radius: 2px;
  margin: 12px auto 20px auto;
  transition: all 0.3s ease;
}

.bottom-sheet-container.visible .sheet-handle {
  background: rgba(244, 208, 63, 0.8);
}

.sheet-content {
  padding: 0 1.5rem 2rem 1.5rem;
}

.planet-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.planet-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.planet-icon-large {
  font-size: 3rem;
  line-height: 1;
  flex-shrink: 0;
}

.planet-details {
  flex: 1;
}

.planet-title {
  font-family: 'Nexa Bold', sans-serif;
  font-size: 1.5rem;
  color: #ffcf47;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 0 10px rgba(244, 208, 63, 0.3);
}

.planet-description {
  font-family: 'Optima', sans-serif;
  font-size: 1rem;
  color: #daa396;
  margin: 0;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  justify-content: center;
}

.explore-button {
  background: linear-gradient(45deg, #ffcf47, #daa396);
  color: #35064f;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  font-family: 'Nexa Bold', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.explore-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 207, 71, 0.4);
  filter: brightness(1.1);
}

.explore-button:active {
  transform: translateY(0);
}

@keyframes chill-pulse {
  0% {
    filter: drop-shadow(0 -10px 30px rgba(135, 206, 250, 0.6)) 
            drop-shadow(0 -20px 50px rgba(173, 216, 230, 0.4))
            drop-shadow(0 -30px 70px rgba(176, 224, 230, 0.3));
  }
  100% {
    filter: drop-shadow(0 -15px 40px rgba(135, 206, 250, 0.8)) 
            drop-shadow(0 -25px 60px rgba(173, 216, 230, 0.6))
            drop-shadow(0 -35px 80px rgba(176, 224, 230, 0.5));
  }
}

@media (max-width: 768px) {
  .sheet-content {
    padding: 0 1rem 1.5rem 1rem;
  }
  
  .planet-header {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .planet-icon-large {
    font-size: 2.5rem;
  }
  
  .planet-title {
    font-size: 1.25rem;
  }
  
  .planet-description {
    font-size: 0.875rem;
  }
  
  .explore-button {
    padding: 0.625rem 1.5rem;
    font-size: 0.875rem;
  }
}
</style>