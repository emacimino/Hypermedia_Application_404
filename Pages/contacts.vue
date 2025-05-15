<template>
  <div :class="$style.content">
    <div>
      <h2>Where are we?</h2>
      <p>📍 White Lotus Center<br />via Orti 15<br />Milano, MI 20134<br />Italy</p>
      <h2>Contacts</h2>
      <p>📞 Phone: +1 (310) 555-8123<br />📧 Email: info@whitelotus.com</p>
      <h2>Opening Hours</h2>
      <p>Monday – Friday: 7:00 AM – 9:00 PM<br />Saturday – Sunday: 8:00 AM – 6:00 PM</p>
    </div>

    <ClientOnly>
      <div id="map" style="height: 500px ; width: 60%;"></div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'

onMounted(async () => {
  await nextTick() // Ensure DOM is ready

  const L = await import('leaflet')

  const map = L.map('map').setView([45.4565, 9.2019], 16)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  L.marker([45.4565, 9.2019]).addTo(map)
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
}
.content h2 {
  margin-bottom: 0;
}
.content p {
  margin-top: 0;
}
.image {
  width: 65%;
  height: auto;
  border-radius: 12px;
}
</style>
