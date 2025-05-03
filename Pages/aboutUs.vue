<template>
  <div :class="$style.aboutUs">
    <!-- Replaced static section with modular Presentation component -->
    <Presentation
        title="About us"
        :paragraphs="[
    'At [Yoga Center Name], we believe that wellness is more than a practice — it\'s a lifestyle rooted in balance, awareness, and community.',
    'Founded with the intention of creating a space where everyone feels welcome, supported, and inspired, our center offers a holistic approach to well-being through yoga, meditation, Pilates, workshops, retreats, and instructor education.',
    'Our passionate team of certified instructors brings together diverse backgrounds and specialties, united by a shared commitment to guiding others toward physical strength, mental clarity, and inner peace. Whether you\'re taking your first class or deepening a long-time practice, you’ll find a nurturing environment that honors your unique journey.',
    'From the quiet of a meditation session to the energy of a CrossFit workout, each experience at [Yoga Center Name] is thoughtfully designed to help you grow, heal, and thrive — on and off the mat.',
    '🌿 Rooted in mindfulness. Driven by community. Focused on your well-being.'
  ]"
        image="/image 19.png"
        :reverse="true"
    />

    <!-- Contacts section -->
    <b :class="$style.contacts1">Contacts</b>
    <b :class="$style.addressZenflowYogaContainer">
      <p :class="$style.atYogaCenter">📍 Zenflow Yoga Center<br />42 Harmony Way<br />Rivervale, CA 90210<br />United States</p>
      <p :class="$style.atYogaCenter">📞 Phone: +1 (310) 555-8123</p>
      <p :class="$style.atYogaCenter">📧 Email: info@zenflowyoga.com</p>
      <p :class="$style.atYogaCenter">🌐 Website:
        <a :class="$style.wwzenflowyogacom" href="http://www.zenflowyoga.com" target="_blank">
          <span :class="$style.wwzenflowyogacom1">www.zenflowyoga.com</span>
        </a>
      </p>
      <p :class="$style.atYogaCenter">🕒 Opening Hours</p>
      <p :class="$style.atYogaCenter">Monday – Friday: 7:00 AM – 9:00 PM</p>
      <p :class="$style.atYogaCenter">Saturday – Sunday: 8:00 AM – 6:00 PM</p>
    </b>
  </div>
</template>

<script setup lang="ts">
import Presentation from '../components/presentation.vue'
</script>

<style module>
.aboutUs {
  width: 100%;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  text-align: left;
  font-size: 64px;
  color: #1f3a5f;
  font-family: Inter;
}
.contacts1 {
  position: absolute;
  top: 1192px;
  left: 59px;
  letter-spacing: -0.02em;
  display: inline-block;
  width: 770px;
  height: 76px;
}
.addressZenflowYogaContainer {
  position: absolute;
  top: 1309px;
  left: 49px;
  font-size: 32px;
  letter-spacing: -0.02em;
}
.atYogaCenter {
  margin: 0;
}
.wwzenflowyogacom1 {
  text-decoration: underline;
}
.wwzenflowyogacom {
  color: inherit;
}
</style>
