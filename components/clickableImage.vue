<script setup lang="ts">
defineProps<{
  to: string
  src: string
  alt?: string
}>()
</script>

<template>
  <NuxtLink :to="to">
    <img :src="src" :alt="alt" class="img" />
  </NuxtLink>
</template>

<style>
.img{
  vertical-align: middle;
}
.img:hover{
  cursor: pointer;
}
</style>

