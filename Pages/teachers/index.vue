<template>
  <div :class="$style.teachers">
    <!-- Reusable header section -->
    <Presentation
        title="Our qualified team"
        :paragraphs="[
        'Our teaching team is the heart of our course — a group of passionate, certified professionals dedicated to guiding you with care, expertise, and authenticity on your journey.',
        'Each instructor brings a unique blend of experience, training, and insight, creating a supportive, engaging, and inclusive space for all participants.',
        'Whether you\'re joining us for meditation, yoga, or functional training, our teachers skillfully adapt each session to meet your needs, offering personalized guidance and encouraging a mindful, sustainable practice.',
        'With empathy, presence, and a deep commitment to your growth, our team is here not just to teach — but to inspire, support, and walk alongside you every step of the way.'
         ]"

        image="/image 11.png"
        :reverse="true"
    />
    <elemGrid :activities="teachers"></elemGrid>
  </div>
</template>

<script setup lang="ts">
import Presentation from '../../components/presentation.vue'
import SingleActivityCard from '../../components/singleActivityCard.vue'
import ElemGrid from "~/components/elemGrid.vue";

function onYogaTeacherContainerClick() {
  // Add your code here
}

const teachers = [
  {
    title: 'Marco Rossi',
    description: 'Meditation & Hatha Yoga Instructor',
    image: '/marco.png',
    address: "teachers"
  },
  {
    title: 'Giulia Ferri',
    description: 'Pilates & Breathwork Guide',
    image: '/giulia.png',
    address: "teachers"
  },
  {
    title: 'Sara Vassari',
    description: 'Functional Training Coach',
    image: '/sara.png',
    address: "teachers"
  },
  {
    title: 'Luca Neroni',
    description: 'Yoga Philosophy & Retreat Leader',
    image: '/luca.png',
    address: "teachers"
  },
  {
    title: 'Sofia Bianchi',
    description: 'Meditation & Hatha Yoga Instructor',
    image: '/sofia.png',
    address: "teachers"
  },
  {
    title: 'Alba Diaz',
    description: 'Pilates & Breathwork Guide',
    image: '/alba.png',
    address: "teachers"
  },
  {
    title: 'Martina Rossi',
    description: 'Functional Training Coach',
    image: '/martina.png',
    address: "teachers"
  },
  {
    title: 'Ginevra Sottili',
    description: 'Yoga Philosophy & Retreat Leader',
    image: '/ginevra.png',
    address: "teachers"
  }
]
</script>

<style  module>

</style>
