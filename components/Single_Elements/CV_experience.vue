<template>
  <!-- Section heading -->
  <div class="w-full max-w-screen-2xl mx-auto px-4 xl:px-8 space-y-8">
    <h2 class="font-semibold" style="font-size: clamp(1.5rem, 2.5vw, 3rem)">
      {{ currentLang == 'it' ? 'Esperienze' : 'Experiences' }}
    </h2>
    <!-- Fallback message shown when no experiences are available -->

    <div v-if="cvs.length === 0" class="text-gray-500 italic" style="font-size: clamp(1rem, 1.3vw, 1.5rem)">
      {{ currentLang === 'it' ? 'Nessuna esperienza precedente.' : 'No previous experience.' }}
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div
          v-for="work in cvs"
          :key="work.ID"
          class="bg-white border rounded-xl p-6 shadow flex flex-col gap-4"
      >
        <div>
          <h3 class="text-blue-700 font-bold" style="font-size: clamp(1.5rem, 2vw, 2.5rem)">
            {{ work.TITLE }}
          </h3>
          <p class="text-gray-600 mt-1 leading-snug" style="font-size: clamp(1rem, 1.2vw, 1.5rem)">
            {{ work.DESCRIPTION }}
          </p>
        </div>

        <p class="text-gray-700 leading-relaxed" style="font-size: clamp(1rem, 1.2vw, 1.4rem)">
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

// Define the structure of each CV item
type CvItem = {
  ID: number
  TEACHER_ID: number
  TITLE: string
  DESCRIPTION: string
  START_DATE: string
  END_DATE: string
  LOCATION: string
}

// Receive the list of CV experiences as a prop
const { cvs } = defineProps<{ cvs: CvItem[] }>()

// Utility function to format date strings into localized readable format
function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>

<style module>

</style>
