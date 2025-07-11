<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <button
        class="modal-close"
        @click="$emit('close')"
        aria-label="Close modal"
      >
        ×
      </button>
      
      <div class="modal-header">
        <div class="planet-preview">
          <div 
            class="planet-mini"
            :class="`bg-gradient-to-br ${planet.color}`"
          >
            <span class="planet-icon">{{ planet.icon }}</span>
          </div>
        </div>
        <h2 class="modal-title">{{ planet.title }}</h2>
        <p class="modal-description">{{ planet.description }}</p>
      </div>
      
      <div class="modal-body">
        <div class="action-buttons">
          <button
            class="btn-primary"
            @click="$emit('navigate', planet.id)"
          >
            Explore {{ planet.name }}
          </button>
          <button
            class="btn-secondary"
            @click="$emit('close')"
          >
            Stay in Orbit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Planet } from '@/types'

interface Props {
  planet: Planet
}

defineProps<Props>()
const emit = defineEmits<{
  close: []
  navigate: [planetId: string]
}>()

const handleOverlayClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: rgba(11, 20, 38, 0.95);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.planet-preview {
  margin-bottom: 1rem;
}

.planet-mini {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFD700;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.modal-description {
  color: #ccc;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #4B1F8E, #2D1355);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(75, 31, 142, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(75, 31, 142, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #ccc;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .planet-mini {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}
</style>