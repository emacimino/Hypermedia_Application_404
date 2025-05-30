<template>
  <div
      :class="[
      'flex flex-col lg:flex-row justify-between gap-4 w-full',
      reverse ? 'lg:flex-row-reverse' : ''
    ]"
  >
    <!-- Image -->
    <div class="flex-1 max-w-full lg:max-w-[40%] min-w-[30%]">
      <div v-if="image">
        <img :src="image" :alt="title" class="w-full h-auto object-cover rounded-lg" />
      </div>
      <div v-else-if="calendar">
        <Calendar />
      </div>
      <div v-else>
        <p>Nessun contenuto disponibile</p>
      </div>
    </div>

    <!-- Text: vertically centered on large screens -->
    <div class="flex-1 max-w-full lg:max-w-[50%] min-w-[300px] flex flex-col lg:justify-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-2">{{ title }}</h2>
      <p class="text-lg md:text-xl leading-relaxed">{{ paragraphs }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  paragraphs: string
  image?: string
  reverse?: boolean
  calendar?: boolean
}>()
</script>
