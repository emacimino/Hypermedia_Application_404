<template>
  <div :class="$style.content">
    <div>
      <h2>Where are we?</h2>
      <p>
        📍 White Lotus Center<br />
        via Orti 15<br />
        Milano, MI 20134<br />
        Italy
      </p>

      <h2>Contacts</h2>
      <p>
        📞 Phone: +1 (310) 555-8123<br />
        📧 Email: info@whitelotus.com
      </p>

      <h2>Opening Hours</h2>
      <p>
        Monday – Friday: 7:00 AM – 9:00 PM<br />
        Saturday – Sunday: 8:00 AM – 6:00 PM
      </p>
    </div>

    <div id="map" :class="$style.map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue'
import 'leaflet/dist/leaflet.css'

const mapLoaded = ref(false)

onMounted(async () => {
  await nextTick()

  // Dinamicamente importa Leaflet solo sul client
  const L = await import('leaflet')

  // Crea il container per la mappa se non esiste
  const mapElement = document.getElementById('map')

  // Inizializza la mappa
  const map = L.map('map').setView([45.4565, 9.2019], 16)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  L.marker([45.4565, 9.2019])
      .addTo(map)
      .bindPopup('Via Orti 15, Milano')
      .openPopup()

  // Forza un resize della mappa per risolvere problemi di rendering
  setTimeout(() => {
    map.invalidateSize()
    mapLoaded.value = true
  }, 100)
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
  position: relative;
  z-index: 1;
}
</style>