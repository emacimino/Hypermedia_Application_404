<template>
  <div :class="$style.container">
    <b :class="$style.hathaYogaCourse">Hatha Yoga Course</b>
    <img :class="$style.image22Icon" alt="" src="/Home%20room.png" />
  </div>
  <div :class="$style.aboutUs">

    <Presentation
        title="Who we are"
        paragraphs="At White Lotus, wellness is a way of life rooted in mindfulness, balance, and a deep sense of community.
        Born from the desire to create an inclusive and inspiring space, we offer yoga, meditation, Pilates, and holistic practices
        to support your journey. Guided by passion and purpose, every class is designed to help you grow, heal, and reconnect — body,
        mind, and spirit."
        image="/presentation1.png"
        :reverse="true"
    />
  </div>
  <div :class="$style.aboutUs">
    <Presentation
        title="Keep your pace"
        paragraphs="Our weekly schedule offers a balanced mix of yoga, meditation and pilates, to support all levels and goals.
        With classes available throughout the day, you can find the right pace - whether you are looking to energize, unwind or
        deepen your practice. Each session is guided by experienced instructors in a welcoming and mindful environment."
        image="/calendar.png"
        :reverse="false"
    />
  </div>
  <div :class="$style.prices">
    <packet
        v-for="(item, index) in packets"
        :key="index"
        :type="item.type"
        :price="item.price"
    />
  </div>
</template>

<script setup lang="ts">
import packet from '../components/packet.vue'

const packets = Array.from({ length: 8 }, (_, i) => ({
  price: `500$`,
  type: `Pacchetto ${i + 1}`
}))

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

.container {
  position: relative;
  display: inline-block; /* or block, depending on layout */
}

.image22Icon {
  width: 100%; /* or your preferred size */
  height: auto;
  display: block;
}
.calendarIcon {
  width: 50%;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  height: 876px;
}

.prices {
  width: 100%;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  text-align: center;
  font-size: 48px;
  color: #000;
  font-family: Inter;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Exactly 4 per row */
  gap: 2rem;
  justify-items: center; /* Center each packet horizontally */
}
.hathaYogaCourse {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100px, 200px);
  color: #1f3a5f; /* or any contrast color */
  padding: 8px;
  font-size: 64px;

}
</style>
