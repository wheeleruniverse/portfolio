<template>
  <!-- Orbit Ring -->
  <div
    class="orbit-ring"
    :style="{
      width: `${responsiveOrbitRadius * 2}px`,
      height: `${responsiveOrbitRadius * 2}px`,
    }"
  ></div>

  <!-- Planet on Orbit -->
  <div
    class="planet-container"
    :class="{ frozen: showTooltip || systemFrozen }"
    :style="{
      width: `${responsiveOrbitRadius * 2}px`,
      height: `${responsiveOrbitRadius * 2}px`,
      animationDuration: `${planet.orbitSpeed}s`,
      transform: `translate(-50%, -50%)`,
    }"
  >
    <div
      ref="planetRef"
      class="planet"
      :class="[
        `bg-gradient-to-br ${planet.color}`,
        { 'planet-frozen': showTooltip || systemFrozen },
      ]"
      :style="{
        width: `${planetSize}px`,
        height: `${planetSize}px`,
        zIndex: planetZIndex,
        left: `${planetInitialPosition.x + responsiveOrbitRadius}px`,
        top: `${planetInitialPosition.y + responsiveOrbitRadius}px`,
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
      <div
        class="planet-content counter-rotate"
        :style="{
          animationDuration: `${planet.orbitSpeed}s`,
        }"
      >
        <div class="planet-icon">{{ planet.icon }}</div>
        <div class="planet-name">{{ planet.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Planet } from '@/types';
import { computed, onMounted, onUnmounted, ref, withDefaults } from 'vue';

interface Props {
  planet: Planet;
  systemFrozen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  systemFrozen: false,
});
const emit = defineEmits<{
  click: [planetId: string];
  hover: [isHovered: boolean];
  tooltip: [
    data: { show: boolean; planet: Planet; x: number; y: number } | null,
  ];
}>();

const showTooltip = ref(false);
const planetRef = ref<HTMLElement>();
const windowWidth = ref(window.innerWidth);

// Update window width on resize
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

// Responsive orbit radius based on screen size
const responsiveOrbitRadius = computed(() => {
  const baseRadius = props.planet.orbitRadius;

  // Mobile (< 768px): Scale down to 35% of original
  if (windowWidth.value < 768) {
    return Math.round(baseRadius * 0.35);
  }
  // Tablet (768px - 1024px): Scale down to 60% of original
  else if (windowWidth.value < 1024) {
    return Math.round(baseRadius * 0.6);
  }
  // Desktop: Use original size
  return baseRadius;
});

// Calculate the initial position based on startAngle
const planetInitialPosition = computed(() => {
  const angle = (props.planet.startAngle * Math.PI) / 180; // Convert to radians
  const radius = responsiveOrbitRadius.value;

  // Calculate position on the orbit circle
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return { x, y };
});

// Calculate planet size based on text length and minimum size
const planetSize = computed(() => {
  const textLength = props.planet.name.length;
  const baseSize = Math.max(props.planet.size, 90); // Minimum 90px

  // Mobile-specific sizing adjustments
  let mobileSizeAdjustment = 1;
  if (windowWidth.value < 768) {
    // On mobile, ensure planets are at least 70px for touch interaction
    mobileSizeAdjustment = 0.9; // Slightly smaller but still touchable
  } else if (windowWidth.value < 1024) {
    // On tablet, moderate scaling
    mobileSizeAdjustment = 0.95;
  }

  // Responsive text sizing: more padding for longer text
  let textPadding = 50; // Base padding
  if (textLength > 6) {
    textPadding += (textLength - 6) * 12; // 12px per extra character
  } else if (textLength > 4) {
    textPadding += (textLength - 4) * 8; // 8px per character over 4
  }

  const calculatedSize =
    Math.max(baseSize, textPadding + 50) * mobileSizeAdjustment;

  // Ensure minimum readable size for long names with mobile considerations
  const minMobileSize = windowWidth.value < 768 ? 70 : 90; // Ensure touch-friendly size

  if (textLength >= 10) {
    return Math.max(calculatedSize, windowWidth.value < 768 ? 100 : 140);
  } else if (textLength >= 8) {
    return Math.max(calculatedSize, windowWidth.value < 768 ? 85 : 120);
  }

  return Math.max(calculatedSize, minMobileSize);
});

// Calculate z-index based on orbit radius (inner planets on top for clickability)
const planetZIndex = computed(() => {
  // Reverse z-index: smaller orbit radius = higher z-index
  // Use responsive radius for consistent layering
  return Math.floor(50 - responsiveOrbitRadius.value / 10);
});

const handleClick = (event: Event) => {
  event.stopPropagation();
  emit('click', props.planet.id);
};

const getTooltipPosition = () => {
  if (!planetRef.value) return { x: 0, y: 0 };

  const rect = planetRef.value.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top - 56,
  };
};

const handleMouseEnter = () => {
  showTooltip.value = true;
  emit('hover', true);

  const position = getTooltipPosition();
  emit('tooltip', {
    show: true,
    planet: props.planet,
    x: position.x,
    y: position.y,
  });
};

const handleMouseLeave = () => {
  showTooltip.value = false;
  emit('hover', false);
  emit('tooltip', null);
};
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
  transition: animation-play-state 0.3s ease;
  pointer-events: none;
}

.planet-container.frozen {
  animation-play-state: paused;
}

.planet {
  position: absolute;
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
  pointer-events: auto;
}

.planet:hover {
  transform: translate(-50%, -50%) scale(1.15);
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
}

.planet-frozen {
  animation: freeze-pulse 2s ease-in-out infinite;
  box-shadow:
    0 0 20px rgba(135, 206, 250, 0.6),
    0 0 40px rgba(0, 191, 255, 0.4),
    0 0 60px rgba(30, 144, 255, 0.3),
    inset 0 0 20px rgba(135, 206, 250, 0.2);
  border: 2px solid rgba(135, 206, 250, 0.5);
}

.planet-frozen .counter-rotate {
  animation-play-state: paused;
}

.planet:focus {
  outline: 2px solid #ffd700;
  outline-offset: 4px;
}

.planet-content {
  text-align: center;
  position: relative;
}

.counter-rotate {
  animation: counter-rotate linear infinite;
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
  0%,
  100% {
    box-shadow:
      0 0 20px rgba(135, 206, 250, 0.6),
      0 0 40px rgba(0, 191, 255, 0.4),
      0 0 60px rgba(30, 144, 255, 0.3),
      inset 0 0 20px rgba(135, 206, 250, 0.2);
    border-color: rgba(135, 206, 250, 0.5);
  }
  50% {
    box-shadow:
      0 0 30px rgba(135, 206, 250, 0.8),
      0 0 60px rgba(0, 191, 255, 0.6),
      0 0 90px rgba(30, 144, 255, 0.5),
      inset 0 0 30px rgba(135, 206, 250, 0.4);
    border-color: rgba(135, 206, 250, 0.8);
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
