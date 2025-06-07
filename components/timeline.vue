<script setup>
const items = [
  {
    date: 'Jan 2024',
    title: 'Vision & Foundation',
    description: 'The idea for the center was born from a desire to create a space for well-being and inner growth.',
    icon: '🌱'
  },
  {
    date: 'Apr 2024',
    title: 'Location Found',
    description: 'We found the perfect venue: bright, peaceful, and surrounded by nature.',
    icon: '🏡'
  },
  {
    date: 'Jun 2024',
    title: 'Renovation & Setup',
    description: 'The space was renovated using natural materials and carefully decorated to promote harmony.',
    icon: '🛠️'
  },
  {
    date: 'Sep 2024',
    title: 'Center Opening',
    description: 'Official opening with a day of free classes, guided meditation, and shared tea.',
    icon: '🎉'
  },
  {
    date: 'Nov 2024',
    title: 'First Full Class',
    description: 'Our first fully booked class — a sign that our community is starting to grow.',
    icon: '🙏'
  },
  {
    date: 'Mar 2025',
    title: 'First Yoga Retreat',
    description: 'We successfully hosted our first weekend yoga retreat surrounded by nature.',
    icon: '🌄'
  },
  {
    date: 'May 2025',
    title: '100+ Active Members',
    description: 'We reached over 100 active members — a milestone that fills us with gratitude.',
    icon: '💖'
  }
]

</script>

<template>
  <div class="relative border-l border-gray-300 ml-8 mt-10 max-w-3xl ">
    <div
        v-for="(item, index) in items"
        :key="index"
        class="mb-10 ml-6"
    >
      <span class="absolute -left-4 flex items-center justify-center w-8 h-8 bg-blue-300 rounded-full text-white text-sm ring-4 ring-white">
        {{ item.icon }}
      </span>

      <p class="text-sm text-gray-500">{{ item.date }}</p>
      <h3 class="text-lg font-semibold text-gray-900">{{ item.title }}</h3>
      <p class="text-base text-gray-700">{{ item.description }}</p>
    </div>
  </div>
</template>


<style scoped>

</style>