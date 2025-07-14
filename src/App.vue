<template>
  <div id="app" class="min-h-screen bg-space-dark relative overflow-hidden">
    <StarField />
    <FloatingNavigation />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import StarField from '@/components/common/StarField.vue';
import FloatingNavigation from '@/components/Navigation/FloatingNavigation.vue';
import { RouterView } from 'vue-router';
</script>
