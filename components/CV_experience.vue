<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Esperienze Docenti</h2>
    <table class="min-w-full table-auto border border-gray-300">
      <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-2 border">Teacher ID</th>
        <th class="px-4 py-2 border">Titolo</th>
        <th class="px-4 py-2 border">Descrizione</th>
        <th class="px-4 py-2 border">Data Inizio</th>
        <th class="px-4 py-2 border">Data Fine</th>
        <th class="px-4 py-2 border">Luogo</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="cv in cvs"
          :key="cv.ID"
          class="hover:bg-gray-50 transition-colors"
      >
        <td class="px-4 py-2 border text-center">{{ cv.TEACHER_ID }}</td>
        <td class="px-4 py-2 border">{{ cv.TITLE }}</td>
        <td class="px-4 py-2 border">{{ cv.DESCRIPTION }}</td>
        <td class="px-4 py-2 border text-center">{{ formatDate(cv.START_DATE) }}</td>
        <td class="px-4 py-2 border text-center">{{ formatDate(cv.END_DATE) }}</td>
        <td class="px-4 py-2 border">{{ cv.LOCATION }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

type CvItem = {
  ID: number
  TEACHER_ID: number
  TITLE: string
  DESCRIPTION: string
  START_DATE: string
  END_DATE: string
  LOCATION: string
}

const props = defineProps<{
  cvs: CvItem[]
}>()

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
</style>
