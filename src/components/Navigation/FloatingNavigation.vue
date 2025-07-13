<template>
  <nav class="nav-floating">
    <div class="nav-content">
      <button
        v-if="currentRoute !== 'home'"
        @click="goHome"
        class="nav-button nav-home"
        aria-label="Return to solar system"
      >
        🌌
      </button>
      
      <div class="nav-divider" v-if="currentRoute !== 'home'"></div>
      
      <div class="nav-links">
        <a
          v-for="link in socialLinks"
          :key="link.id"
          :href="link.url"
          :aria-label="link.label"
          class="nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span 
            v-if="link.iconType === 'svg'" 
            class="nav-icon-svg"
            v-html="link.icon"
          ></span>
          <span v-else class="nav-icon-emoji">{{ link.icon }}</span>
        </a>
      </div>
      
      <div class="nav-divider"></div>
      
      <button
        @click="downloadResume"
        class="nav-button nav-resume"
        aria-label="Download resume"
      >
        📄
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { SocialLink } from '@/types'
import { usePortfolioConfig, getSocialLinks, getBrandAssets } from '@/composables/usePortfolioConfig'

const route = useRoute()
const router = useRouter()

const currentRoute = computed(() => route.name)
const { config, isLoading, error } = usePortfolioConfig()

const socialLinks = computed(() => getSocialLinks())
const brandAssets = computed(() => getBrandAssets())

const goHome = () => {
  router.push('/')
}

const downloadResume = () => {
  // This would link to your actual resume file
  window.open(brandAssets.value?.resume || '/resume.pdf', '_blank')
}
</script>

<style scoped>
.nav-floating {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  background: rgba(75, 31, 142, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-button,
.nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.nav-button:hover,
.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-icon-svg {
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon-svg svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.nav-icon-emoji {
  font-size: 1.2rem;
}

.nav-button:focus,
.nav-link:focus {
  outline: 2px solid #FFD700;
  outline-offset: 2px;
}

.nav-links {
  display: flex;
  gap: 0.25rem;
}

.nav-divider {
  width: 1px;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 0.25rem;
}

.nav-home {
  background: rgba(255, 215, 0, 0.2);
}

.nav-resume {
  background: rgba(244, 164, 96, 0.2);
}

@media (max-width: 768px) {
  .nav-floating {
    top: 1rem;
    right: 1rem;
    padding: 0.5rem;
  }
  
  .nav-button,
  .nav-link {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
  
  .nav-content {
    gap: 0.25rem;
  }
}
</style>