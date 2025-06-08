<template>
  <div :class="$style.timelineContainer">
    <div
        v-for="(item, index) in items"
        :key="index"
        :class="[$style.timelineItem, { [$style.visible]: visibleItems[index] }]"
        class="timeline-item"
    >
      <span :class="$style.iconCircle">{{ item.icon }}</span>

      <p :class="$style.dateText">{{ item.date }}</p>
      <h3 :class="$style.titleText">{{ item.title }}</h3>
      <p :class="$style.descriptionText">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const visibleItems = ref<boolean[]>(Array(items.length).fill(false))

onMounted(() => {
  nextTick(() => {
    const observers = document.querySelectorAll('.timeline-item')

    observers.forEach((el, index) => {
      const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                visibleItems.value[index] = true
                observer.unobserve(entry.target)
              }
            })
          },
          {
            threshold: 0.1,
            rootMargin: '-100px 0px -100px 0px'
          }
      )
      observer.observe(el)
    })
  })
})
</script>

<style module>
.timelineContainer {
  position: relative;
  border-left: 2px solid #d1d5db;
  margin-left: 2rem;
  margin-top: 2.5rem;
  max-width: 48rem;
}
.timelineItem {
  margin-bottom: 2.5rem;
  margin-left: 1.5rem;
  position: relative;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.timelineItem.visible {
  opacity: 1;
  transform: translateY(0);
}
.iconCircle {
  position: absolute;
  left: -2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #93c5fd;
  border-radius: 9999px;
  color: white;
  font-size: 0.875rem;
  box-shadow: 0 0 0 4px white;
}
.dateText {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.25rem 0;
}
.titleText {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}
.descriptionText {
  font-size: 1rem;
  color: #374151;
  margin: 0;
}
</style>