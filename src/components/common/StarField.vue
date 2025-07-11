<template>
  <div class="star-field">
    <div
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        animationDelay: `${star.delay}s`,
        animationDuration: `${star.duration}s`
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

const stars = ref<Star[]>([])

const generateStars = (count: number) => {
  const starArray: Star[] = []
  
  for (let i = 0; i < count; i++) {
    starArray.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
    })
  }
  
  return starArray
}

onMounted(() => {
  stars.value = generateStars(150)
})
</script>

<style scoped>
.star-field {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}
</style>