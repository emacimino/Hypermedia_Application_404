<template>
  <!-- Container for the entire timeline -->
  <div :class="$style.timelineContainer">
    <!-- Loop through translatedItems to display each timeline entry -->
    <div
        v-for="(item, index) in translatedItems"
        :key="index"
        :class="[$style.timelineItem, { [$style.visible]: visibleItems[index] }]"
        class="timeline-item"
    >
      <span :class="$style.iconCircle">{{ item.Icon }}</span>
      <p :class="$style.dateText">{{ item.Date }}</p>
      <h2 :class="$style.titleText">{{ item.Title }}</h2>
      <p :class="$style.descriptionText">{{ item.Description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import { useTimelineStore } from '~/stores/aboutUs/timelineStore'
import { storeToRefs } from 'pinia'

const { currentLang } = useLanguage()

const timelineStore = useTimelineStore()
const { items } = storeToRefs(timelineStore)

// Track which items should be visible
const visibleItems = ref<boolean[]>([])

// Generate items translated according to the current language
const translatedItems = computed(() =>
    items.value.map(item => ({
      Icon: item.Icon,
      Date: item[`Date_${currentLang.value}`],
      Title: item[`Title_${currentLang.value}`],
      Description: item[`Description_${currentLang.value}`],
    }))
)

// Trigger item visibility using IntersectionObserver after mount
onMounted(() => {
  nextTick(() => {
    const elements = document.querySelectorAll('.timeline-item')

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(elements).indexOf(entry.target)
          if (index !== -1) visibleItems.value[index] = true
        }
      })
    }, { threshold: 0.1 })

    elements.forEach((el, i) => {
      visibleItems.value[i] = false
      observer.observe(el)
    })
  })
})
</script>

<style module>
/* Styling for the timeline component */
.timelineContainer {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
  padding-top: 3rem;
  align-items: center;
}

.timelineItem {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  text-align: center;
  max-width: 900px;
}

.visible {
  opacity: 1;
  transform: translateY(0);
}

.iconCircle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #0769a2;
  color: white;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.dateText {
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 0.3rem;
}

.titleText {
  font-size: 2rem;
  font-weight: bold;
  color: #0769a2;
  margin-bottom: 0.3rem;
}

.descriptionText {
  font-size: 1rem;
  color: #333;
  max-width: 80%;
  margin: 0 auto;
}
</style>
