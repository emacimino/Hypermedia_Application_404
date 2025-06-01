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
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: #1F3A5F;
  font-size: 26px;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  line-height: 50px;
  word-wrap: break-word;
  text-align: center;
  text-decoration: none;
}
.menu-item:hover {
  text-decoration: underline;
  cursor: pointer;
  transform: scale(1.2);
  transition: transform 0.15s ease;
}
</style>