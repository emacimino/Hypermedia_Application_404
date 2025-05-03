<template>
  <presentation
      title="What do we offer?"
      :paragraphs="[
      'At White Lotus Center, we believe in creating a peaceful space where mind, body, and spirit connect. ' +
       'Nestled in the heart of the city, our studio offers a calm retreat from the busy world outside — ' +
        'a place where you can breathe, move, and grow at your own pace.',
      'We offer a wide variety of yoga classes suitable for all levels, from complete beginners to experienced practitioners. ' +
       'Whether you\'re seeking strength, flexibility, balance, or inner peace, you\'ll find a class that suits your needs.'
    ]"
      image="/presentation1.png"
      :reverse = true
  />

</template>

<script setup lang="ts">
import presentation from "~/components/presentation.vue";
</script>

<style scoped>

</style>