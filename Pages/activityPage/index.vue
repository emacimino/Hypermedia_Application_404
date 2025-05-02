<template>
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

const activities = [
  {
    title: 'Hatha Yoga',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Mindfulness',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Meditation course',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Vinyasa yoga',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Workshops',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Seminars',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Retreats',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Education',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Crossfit',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  },
  {
    title: 'Pilates',
    description: 'Description of fifth product',
    image: '/hathayoga.png'
  }
];
</script>

<style  module>
.courseGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0 50px;
  padding: 20px;
}
.courseGrid * {
  border: 1px dashed red;
}
</style>