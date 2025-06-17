<script setup lang="ts">
defineProps({ error: Object })
</script>

<template>
  <div class="p-8 text-center">
    <h1 class="text-3xl font-bold text-red-600">Errore {{ error.statusCode }}</h1>
    <p class="mt-4 text-lg">{{ error.statusMessage || 'Si è verificato un errore imprevisto' }}</p>
    <NuxtLink to="/" class="mt-6 inline-block underline text-blue-500">Torna alla home</NuxtLink>
  </div>
</template>

<style scoped>

</style>