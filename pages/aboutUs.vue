<template>
  <div :class="$style.aboutUs">
    <Presentation
        title="About us"
        paragraphs="At White Lotus Center, we believe that wellness is more than a practice —
        it's a lifestyle rooted in balance, awareness, and community. Founded with the intention of creating a space where everyone
        feels welcome, supported, and inspired, our center offers a holistic approach to well-being through yoga, meditation,
        Pilates, workshops, retreats, and instructor education. Our passionate team of certified instructors brings together diverse
        backgrounds and specialties, united by a shared commitment to guiding others toward physical strength, mental clarity,
        and inner peace. Whether you\'re taking your first class or deepening a long-time practice, you’ll find a nurturing environment
        that honors your unique journey. From the quiet of a meditation session to the energy of a CrossFit workout,
        each experience at White Lotus is thoughtfully designed to help you grow, heal, and thrive — on and off the mat.
        🌿 Rooted in mindfulness. Driven by community. Focused on your well-being."
        image="/image 19.png"
        :reverse="true"
    />
  </div>
</template>

<script setup lang="ts">
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
</style>
