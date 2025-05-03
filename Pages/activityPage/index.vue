<template>
    <!-- Replaced static section with modular Presentation component -->
    <Presentation
        title="What do we offer"
        :paragraphs="[
        'At Serene Flow Yoga, we believe in creating a peaceful space where mind, body, and spirit connect.',
        'Nestled in the heart of the city, our studio offers a calm retreat from the busy world outside — a place where you can breathe, move, and grow at your own pace.',
        'We offer a wide variety of yoga classes suitable for all levels, from complete beginners to experienced practitioners.',
        'Whether you\'re seeking strength, flexibility, balance, or inner peace, you\'ll find a class that suits your needs.'
        ]"

        image="/presentation1.png"
        :reverse="true"
    />
  <div :class="$style.courseGrid">
    <singleActivityCard
        v-for="(activity, index) in activities"
        :key="index"
        :title="activity.title"
        :description="activity.description"
        :image="activity.image"
    />
  </div>
</template>

<script setup>
import SingleActivityCard from "~/components/singleActivityCard.vue";
import Presentation from "~/components/presentation.vue";

const activities = [
  {
    title: 'Hatha Yoga',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Mindfulness',
    description: 'Description of fifth product',
    image: '/mindfulness.png'
  },
  {
    title: 'Meditation course',
    description: 'Description of fifth product',
    image: '/meditation.png'
  },
  {
    title: 'Vinyasa yoga',
    description: 'Description of fifth product',
    image: '/vinyasa.png'
  },
  {
    title: 'Workshops',
    description: 'Description of fifth product',
    image: '/workshops.png'
  },
  {
    title: 'Seminars',
    description: 'Description of fifth product',
    image: '/seminars.png'
  },
  {
    title: 'Retreats',
    description: 'Description of fifth product',
    image: '/retreats.png'
  },
  {
    title: 'Education',
    description: 'Description of fifth product',
    image: '/education.png'
  },
  {
    title: 'Crossfit',
    description: 'Description of fifth product',
    image: '/crossfit.png'
  },
  {
    title: 'Pilates',
    description: 'Description of fifth product',
    image: '/pilates.png'
  }
];
</script>

<style  module>
.courseGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0 10%;
  padding: 10%;
}
.courseGrid * {
  border: 1px dashed red;
}
</style>