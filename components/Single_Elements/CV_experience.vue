<template>
  <!-- Section heading -->
  <h2 class="text-2xl md:text-xl 2xl:text-4xl font-semibold">
    {{ currentLang == 'it' ? 'Esperienze' : 'Experiences' }}
  </h2>

  <!-- Fallback message shown when no experiences are available -->
  <div v-if="cvs.length === 0" class="text-gray-500 italic">
    {{ currentLang === 'it' ? 'Nessuna esperienza precedente.' : 'No previous experience.' }}
  </div>


  <div class="grid md:grid-cols-2 gap-6">

    <!-- Render each work experience from the `cvs` array -->
    <div
        v-for="work in cvs"
        :key="work.ID"
        class="bg-white border rounded p-4 shadow md:grid md:grid-cols-2"
    >

      <div class="text-[clamp(1rem,1.5vw,1.25rem)]" :class="[$style.bigText]">
        <h3 class="text-blue-700 font-semibold">{{ work.TITLE }}</h3>
        <span class="text-gray-600">{{ work.DESCRIPTION }}</span>
      </div>


      <p class="text-gray-700 mt-1 text-[clamp(1rem,1.5vw,1.25rem)]" :class="[$style.bigText]">
        {{ currentLang == 'it' ? 'Inizio:' : 'Start:' }}
        <strong>{{ formatDate(work.START_DATE) }}</strong><br />
        {{ currentLang == 'it' ? 'Fine:' : 'End:' }}
        <strong>{{ formatDate(work.END_DATE) }}</strong>
      </p>
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
.bigText {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
}

@media (min-width: 1440px) {
  .bigText {
    font-size: clamp(2rem, 1.5vw, 2.5rem);
  }
}
</style>
