<template>
  <div :class="$style.content">
    <div>
      <h2>Where are we?</h2>
      <p>📍 White Lotus Center<br />42 Harmony Way<br />Rivervale, CA 90210<br />United States</p>
      <h2>Contacts</h2>
      <p>📞 Phone: +1 (310) 555-8123<br />📧 Email: info@whitelotus.com</p>
      <h2>Opening Hours</h2>
      <p>Monday – Friday: 7:00 AM – 9:00 PM<br />Saturday – Sunday: 8:00 AM – 6:00 PM</p>
    </div>
    <img :class="$style.image" src="/map.png" alt="White Lotus Center" />
  </div>
</template>

<script setup lang="ts">
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
