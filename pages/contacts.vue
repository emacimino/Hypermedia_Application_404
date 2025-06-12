
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
import { watchEffect } from 'vue'
import { onMounted, nextTick } from 'vue'
import { useSupabaseClient } from '#imports'
import { useContactsStore } from '~/stores/contactsStore'
import { useLanguage } from '~/composables/useLanguage'
import { storeToRefs } from 'pinia'
import { pageMeta } from '~/locales/pages'
import 'leaflet/dist/leaflet.css'

// Init Supabase and language
const supabase = useSupabaseClient()
const { currentLang } = useLanguage()

// Init store and refs
const contactsStore = useContactsStore()
const {
  whereAreWeTitle,
  whereAreWeParagraph,
  contactsTitle,
  contactsParagraph,
  openingHoursTitle,
  openingHoursParagraph,
} = storeToRefs(contactsStore)

// Set meta tags
useHead({
  title: pageMeta.contacts.title[currentLang.value] || pageMeta.contacts.title.en,
  meta: [
    { name: 'description', content: pageMeta.contacts.description[currentLang.value] }
  ]
})


onMounted(async () => {
  await contactsStore.fetchAllContent(supabase, currentLang.value)

  await nextTick()
  const L = await import('leaflet')

  const map = L.map('map').setView([45.4565, 9.2019], 16)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap & CartoDB',
  }).addTo(map)

  L.marker([45.4565, 9.2019])
      .addTo(map)
      .bindPopup('Via Privata Siracusa, Milano')
      .openPopup()
})

watchEffect(() => {
  contactsStore.fetchAllContent(supabase, currentLang.value)
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
