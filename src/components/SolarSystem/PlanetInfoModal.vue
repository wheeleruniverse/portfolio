<template>
  <div
    class="modal-overlay"
    @click="handleOverlayClick"
    :class="{ navigating: isNavigating }"
  >
    <div
      class="modal-content"
      @click.stop
      :class="{ navigating: isNavigating }"
    >
      <button
        class="modal-close"
        @click="$emit('close')"
        aria-label="Close modal"
      >
        ×
      </button>

      <div class="modal-header">
        <div class="planet-preview">
          <div class="planet-mini" :class="`bg-gradient-to-br ${planet.color}`">
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
            @click="handleNavigate"
            :disabled="isNavigating"
          >
            <span v-if="!isNavigating">Explore {{ planet.name }}</span>
            <span v-else class="loading-spinner">
              <span class="spinner"></span>
              Launching...
            </span>
          </button>
          <button class="btn-secondary" @click="$emit('close')">
            Stay in Orbit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Planet } from '@/types';
import { ref } from 'vue';

interface Props {
  planet: Planet;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
  navigate: [planetId: string];
}>();

const isNavigating = ref(false);

const handleNavigate = async () => {
  isNavigating.value = true;

  // Add a small delay to show the loading state
  await new Promise(resolve => setTimeout(resolve, 800));

  // Emit the navigate event
  emit('navigate', props.planet.id);
};

const handleOverlayClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close');
  }
};
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
  transition: all 0.5s ease;
}

.modal-overlay.navigating {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
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
  transition: all 0.5s ease;
  transform: scale(1);
  opacity: 1;
}

.modal-content.navigating {
  transform: scale(0.95);
  opacity: 0.8;
  filter: blur(2px);
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
  color: #ffd700;
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
  background: linear-gradient(135deg, #4b1f8e, #2d1355);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(75, 31, 142, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(75, 31, 142, 0.4);
}

.btn-primary:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
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
