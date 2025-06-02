
<template>
  <div :class="$style.content">
    <div :class="$style.textContent">
      <h2>{{ whereAreWeTitle }}</h2>
      <p v-html="whereAreWeParagraph" />

      <h2>{{ contactsTitle }}</h2>
      <p v-html="contactsParagraph" />

      <h2>{{ openingHoursTitle }}</h2>
      <p v-html="openingHoursParagraph" />
    </div>

    <div id="map" :class="$style.map"></div>
  </div>
</template>




<script setup lang="ts">
import { ref, watchEffect, onMounted, nextTick } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import 'leaflet/dist/leaflet.css'

const supabase = useSupabaseClient()
const { currentLang } = useLanguage()

// Reactive refs for each section
const whereAreWeTitle = ref('')
const whereAreWeParagraph = ref('')

const contactsTitle = ref('')
const contactsParagraph = ref('')

const openingHoursTitle = ref('')
const openingHoursParagraph = ref('')

// Utility function to get correct column names
function getColumnName(base: string): string {
  return currentLang.value === 'it' ? `${base}_it` : base
}

// WatchEffect per section
watchEffect(async () => {
  const titleCol = getColumnName('Title')
  const paragraphCol = getColumnName('Paragraph')

  const { data, error } = await supabase
      .from('Presentation')
      .select(`${titleCol}, ${paragraphCol}`)
      .eq('Title', 'Where are we?')
      .single()

  if (!error && data) {
    whereAreWeTitle.value = data[titleCol]
    whereAreWeParagraph.value = data[paragraphCol]
  }
})

watchEffect(async () => {
  const titleCol = getColumnName('Title')
  const paragraphCol = getColumnName('Paragraph')

  const { data, error } = await supabase
      .from('Presentation')
      .select(`${titleCol}, ${paragraphCol}`)
      .eq('Title', 'Contacts')
      .single()

  if (!error && data) {
    contactsTitle.value = data[titleCol]
    contactsParagraph.value = data[paragraphCol]
  }
})

watchEffect(async () => {
  const titleCol = getColumnName('Title')
  const paragraphCol = getColumnName('Paragraph')

  const { data, error } = await supabase
      .from('Presentation')
      .select(`${titleCol}, ${paragraphCol}`)
      .eq('Title', 'Opening Hours')
      .single()

  if (!error && data) {
    openingHoursTitle.value = data[titleCol]
    openingHoursParagraph.value = data[paragraphCol]
  }
})

// Leaflet map
onMounted(async () => {
  await nextTick()
  const L = await import('leaflet')
  const map = L.map('map').setView([45.4565, 9.2019], 16)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  L.marker([45.4565, 9.2019])
      .addTo(map)
      .bindPopup('Via Privata Siracusa, Milano')
      .openPopup()
})
</script>


<style module>
.content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 32px;
  font-size: 20px;
  color: #1f3a5f;
  gap: 24px;
}
.content h2 {
  font-size: 28px;
  font-weight: bold;
}
.textContent {
  margin-top: 140px;
}
.map {
  height: 500px;
  width: 60%;
  min-width: 300px;
  border-radius: 12px;
  border: 1px solid #ccc;
}
</style>
