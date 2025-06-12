<template>
  <div>
    <h2 style="font-size: 1.75vw; font-weight: 600;">
      {{currentLang == 'it' ? 'Esperienze' : 'Experiences'}}
    </h2>
    <div v-if="cvs.length === 0" class="text-gray-500 italic">
      {{ currentLang === 'it' ? 'Nessuna esperienza precedente.' : 'No previous experience.' }}
    </div>
    <div class="grid md:grid-cols-2 gap-6">

    <div
        v-for="work in cvs"
        :key="work.ID"
        class="bg-white border rounded p-4 shadow md:grid md:grid-cols-2"
    >
      <div>
        <h3 class="text-blue-700 font-semibold">{{ work.TITLE }}</h3>
        <span class="text-sm text-gray-600">{{ work.DESCRIPTION }}</span>
      </div>
      <p class="text-sm text-gray-700 mt-1">
        {{ currentLang == 'it' ? 'Inizio:' : 'Start:' }}
        <strong>{{ formatDate(work.START_DATE) }}</strong><br />
        {{ currentLang == 'it' ? 'Fine:' : 'End:' }}
        <strong>{{ formatDate(work.END_DATE) }}</strong>
      </p>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
const { currentLang } = useLanguage()
type CvItem = {
  ID: number
  TEACHER_ID: number
  TITLE: string
  DESCRIPTION: string
  START_DATE: string
  END_DATE: string
  LOCATION: string
}

const { cvs } = defineProps<{ cvs: CvItem[] }>()


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
