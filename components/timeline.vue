<script setup>
const items = [
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: '🚀'
  },
  {
    date: 'Mar 22 2025',
    title: 'Design Phase',
    description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
    icon: '🎨'
  },
  {
    date: 'Mar 29 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: '💻'
  },
  {
    date: 'Apr 5 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: '✅'
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