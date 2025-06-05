<template>
  <NuxtLink :to="to" class="menu-item">
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  to: string;
}>()
</script>

<style scoped>
.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: #1F3A5F;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  word-wrap: break-word;
  text-align: center;
  text-decoration: none;

  font-size: clamp(1rem, 2.2vw, 6rem);     /* scala dinamica */
  height: clamp(40px, 6vw, 60px);          /* altezza fluida */
  line-height: clamp(40px, 6vw, 60px);     /* coerente con altezza */

  transition: transform 0.2s ease, text-shadow 0.2s ease;
}

.menu-item:hover {
  cursor: pointer;
  transform: scale(1.08);
  text-shadow: 0 0 4px rgba(31, 58, 95, 0.4);
}


</style>