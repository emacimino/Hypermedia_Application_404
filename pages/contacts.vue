<template>
  <div :class="$style.content">
    <div>
      <h2>{{ whereAreWeTitle }}</h2>
      <p v-html="whereAreWeParagraph" />

      <h2>{{ contactsTitle }}</h2>
      <p v-html="contactsParagraph" />

      <h2>{{ openingHoursTitle }}</h2>
      <p v-html="openingHoursParagraph" />

      <h2>{{currentLang === 'en' ? 'Follow us on:' : 'Seguici su:'}}</h2>
      <div :class="$style.socialIcons">
        <a href="https://facebook.com"
           target="_blank"
           :aria-label="currentLang === 'en' ? 'Visit our Facebook profile' : 'Visita il nostro profilo Facebook'">
          <Icon name="logos:facebook" :class="$style.icon" />
        </a>
        <a href="https://instagram.com"
           target="_blank"
           :aria-label="currentLang === 'en' ? 'Visit our Instagram profile' : 'Visita il nostro profilo Instagram'">
          <Icon name="logos:instagram-icon" :class="$style.icon" />
        </a>
        <a href="https://youtube.com"
           target="_blank"
           :aria-label="currentLang === 'en' ? 'Visit our YouTube profile' : 'Visita il nostro profilo YouTube'">
          <Icon name="logos:youtube-icon" :class="$style.icon" />
        </a>
      </div>

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

const supabase = useSupabaseClient()
const { currentLang } = useLanguage()

const contactsStore = useContactsStore()
const {
  whereAreWeTitle,
  whereAreWeParagraph,
  contactsTitle,
  contactsParagraph,
  openingHoursTitle,
  openingHoursParagraph,
} = storeToRefs(contactsStore)

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
  font-size: clamp(1rem, 3vw, 1.75rem);
  font-weight: bold;
}
.content p {
  font-size: clamp(0.75rem, 2vw, 1.25rem);
}
.map {
  height: 500px;
  width: 60%;
  min-width: 300px;
  border-radius: 12px;
  border: 1px solid #ccc;
}
.content p a {
  text-decoration: underline;
  color: inherit;
}
.content p a:hover {
  color: #1d4ed8;
}
.socialIcons {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.icon {
  font-size: 2rem;
  transition: transform 0.2s ease;
}
.icon:hover {
  transform: scale(1.25);
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
  .icon {
    font-size: 1.5rem;
  }
}

@media (min-width: 2560px) {
  .content h2 {
    font-size: 3rem;
  }
  .content p {
    font-size: 2.25rem;
  }
  .map {
    height: 700px;
    min-width: 400px;
  }
  .icon {
    font-size: 3rem;
  }
}
</style>
