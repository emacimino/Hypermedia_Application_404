
<template>
  <div :class="$style.content">
    <div>
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
import {useSupabaseClient} from "#imports";
import {pageMeta} from "~/locales/pages";

const supabase = useSupabaseClient()
const { currentLang } = useLanguage()
useHead({
  title: pageMeta.contacts.title[currentLang.value] || pageMeta.contacts.title.en,
  meta: [
    { name: 'description', content: pageMeta.contacts.description[currentLang.value] }
  ]
})

const whereAreWeTitle = ref('')
const whereAreWeParagraph = ref('')

const contactsTitle = ref('')
const contactsParagraph = ref('')

const openingHoursTitle = ref('')
const openingHoursParagraph = ref('')

function getColumnName(base: string): string {
  return currentLang.value === 'it' ? `${base}_it` : base
}

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
    whereAreWeParagraph.value = (data[paragraphCol] as string).replace(/\n/g, '<br>')
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
    contactsParagraph.value = (data[paragraphCol] as string).replace(/\n/g, '<br>')
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
    openingHoursParagraph.value = (data[paragraphCol] as string).replace(/\n/g, '<br>')
  }
})

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
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
}
.content h2 {
  font-size: clamp(1rem, 3vw, 2rem);
  font-weight: bold;
}
.content p {
  font-size: clamp(0.75rem, 2vw, 1.5rem);
}
.map {
  height: 500px;
  width: 60%;
  min-width: 300px;
  border-radius: 12px;
  border: 1px solid #ccc;
}


@media (max-width: 760px) {
  .content{
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  .content h2 {
    font-size: 1.5rem;
  }
  .content p {
    font-size: 1rem;
  }
  .map{
    min-width: 100%;
    position: relative;
    z-index: 1;
  }
}

@media (min-width: 2560px) {
  .content h2 {
    font-size: 4rem;
  }
  .content p {
    font-size: 2.5rem;
  }
  .map {
    height: 600px;
    min-width: 400px;
  }
}
</style>
