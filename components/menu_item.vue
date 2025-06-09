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
//.
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

  font-size: clamp(1rem, 1.5vw, 2.2rem);
  height: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1.2;

  transition: transform 0.2s ease, text-shadow 0.2s ease;
}

.menu-item:hover {
  cursor: pointer;
  transform: scale(1.15);
  text-shadow: 0 0 10px rgba(31, 58, 95, 0.5);
}
@media (max-width: 767px) {
  .menu-item {
    font-size: clamp(2rem, 4vw, 3rem);
    height: clamp(2.5rem, 10vw, 3.5rem);
  }
}

</style>