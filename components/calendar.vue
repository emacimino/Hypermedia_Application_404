<script setup lang="ts">
import Header from './Header.vue'
import calendarGrid from './calendarGrid.vue'
</script>

<template>
  <main class="w-[500px] pb-[30px] rounded bg-azure shadow-[5px_5px_20px_rgba(0,0,0,0.5)] max-w-[90vw]">
    <!-- Using Header and calendarGrid Component -->
    <Header />
    <calendarGrid />
  </main>
</template>