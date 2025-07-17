<template>
  <div class="return-to-solar-system">
    <button
      @click="handleReturnToSolarSystem"
      class="return-button"
      :class="{ visible: isVisible, navigating: isNavigating }"
      :disabled="isNavigating"
      title="Return to Solar System"
    >
      <span v-if="!isNavigating" class="return-content">
        <span class="return-icon">🚀</span>
        <span class="return-text">Solar System</span>
      </span>
      <span v-else class="loading-content">
        <span class="spinner"></span>
        <span class="loading-text">Returning...</span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isVisible = ref(false);
const isNavigating = ref(false);

const handleReturnToSolarSystem = async () => {
  isNavigating.value = true;
  
  // Add page fade-out effect
  document.body.classList.add('page-transitioning');
  
  // Wait for transition to complete
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Navigate to home
  router.push('/');
};

const returnToSolarSystem = () => {
  handleReturnToSolarSystem();
};

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  // Show button when user scrolls down more than half a screen
  isVisible.value = scrollPosition > windowHeight * 0.5;
};

// Watch for route changes to reset navigation state
watch(route, () => {
  isNavigating.value = false;
  document.body.classList.remove('page-transitioning');
}, { immediate: true });

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial position
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  // Clean up any transition class that might be left
  document.body.classList.remove('page-transitioning');
});
</script>

<style scoped>
.return-to-solar-system {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.return-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 215, 0, 0.9);
  color: #1a1a1a;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(100px);
  opacity: 0;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
  backdrop-filter: blur(10px);
}

.return-button.visible {
  transform: translateY(0);
  opacity: 1;
}

.return-button:hover:not(:disabled) {
  background: rgba(255, 215, 0, 1);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255, 215, 0, 0.4);
}

.return-button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.return-button.navigating {
  background: rgba(255, 215, 0, 0.7);
  transform: translateY(0);
}

.return-content,
.loading-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid #1a1a1a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 0.9rem;
  white-space: nowrap;
}

.return-icon {
  font-size: 1.2rem;
  animation: pulse 2s infinite;
}

.return-text {
  font-size: 0.9rem;
  white-space: nowrap;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .return-to-solar-system {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  .return-button {
    padding: 0.6rem 1rem;
  }

  .return-text {
    font-size: 0.8rem;
  }
}
</style>
