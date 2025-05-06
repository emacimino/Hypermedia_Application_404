<template>
    <!-- Replaced static section with modular Presentation component -->
    <Presentation
        title="What do we offer?"
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
        @click=onClick(activity.title)

    />
  </div>
</template>

<script setup>
import SingleActivityCard from "~/components/singleActivityCard.vue";
import Presentation from "~/components/presentation.vue";
import {useRoute} from "vue-router";
const router = useRouter();  // Access the current route

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
function onClick(title) {
  console.log('Click sul bottone');
  router.push(`/activityPage/${title}`);
}
</script>

<style  module>
@import "/assets/main.css";

.courseGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--gap);
  padding: var(--padding);
}

.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-0.25rem);
}

.card img {
  width: 100%;
  height: var(--img-height);
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: var(--font-title);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: var(--font-base);
  color: #555;
}
</style>