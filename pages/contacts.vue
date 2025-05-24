<template>
  <div :class="$style.content">
    <div>
      <h2>{{ t('pages.contacts.locationTitle') }}</h2>
      <p v-html="t('pages.contacts.address')" />

      <h2>{{ t('pages.contacts.contactTitle') }}</h2>
      <p v-html="t('pages.contacts.contactDetails')" />

      <h2>{{ t('pages.contacts.hoursTitle') }}</h2>
      <p v-html="t('pages.contacts.hoursDetails')" />
    </div>

    <div id="map" :class="$style.map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import 'leaflet/dist/leaflet.css'

const { t } = useLanguage()

onMounted(async () => {
  await nextTick()
  const L = await import('leaflet')
  const map = L.map('map').setView([45.4565, 9.2019], 16)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  L.marker([45.4565, 9.2019])
      .addTo(map)
      .bindPopup('Via Orti 15, Milano')
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
  margin-bottom: 0;
}
.content p {
  margin-top: 0;
}
.map {
  height: 500px;
  width: 60%;
  min-width: 300px;
  border-radius: 12px;
  border: 1px solid #ccc;
}
</style>
