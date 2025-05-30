<template>
  <div
      :class="[
      'flex flex-col lg:flex-row justify-between gap-4 w-full',
      reverse ? 'lg:flex-row-reverse' : ''
    ]"
  >
    <!-- Immagine o calendario -->
    <div class="w-full lg:w-1/2">
      <div v-if="image">
        <img :src="image" :alt="title" class="w-full h-auto object-cover rounded-lg" />
      </div>
      <div v-else-if="calendar">
        <Calendar class="w-full" />
      </div>
      <div v-else>
        <p>Nessun contenuto disponibile</p>
      </div>
    </div>

    <!-- Testo -->
    <div class="w-full lg:w-1/2 flex flex-col lg:justify-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-2">{{ title }}</h2>
      <p class="text-lg md:text-xl leading-relaxed">{{ paragraphs }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from "vue"

const calendar = defineAsyncComponent(() => import("./Calendar/index.vue"))
defineProps<{
  title: string
  paragraphs: string
  image?: string
  reverse?: boolean
  calendar?: boolean
}>()
</script>
