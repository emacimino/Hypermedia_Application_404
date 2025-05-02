<script setup lang="ts">
defineProps<{
  to: string
  src: string
  alt?: string
}>()
</script>

<template>
  <NuxtLink :to="to">
    <img :src="src" :alt="alt" class="logo" />
  </NuxtLink>
</template>

<style>
.logo{
  vertical-align: middle;
}
.logo:hover{
  cursor: pointer;
}
</style>

