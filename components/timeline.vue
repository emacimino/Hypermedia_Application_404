<template>
  <div :class="$style.timelineContainer">
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
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import { useTimelineStore } from '~/stores/timelineStore'
import { storeToRefs } from 'pinia'

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

const timelineStore = useTimelineStore()
const { items } = storeToRefs(timelineStore)
const visibleItems = ref<boolean[]>([])

const translatedItems = computed(() =>
    items.value.map(item => ({
      ...item,
      Title: currentLang.value === 'it' ? item.Title_it : item.Title,
      Description: currentLang.value === 'it' ? item.Description_it : item.Description,
    }))
)

onMounted(async () => {
  await timelineStore.fetchTimeline(supabase)

  visibleItems.value = Array(items.value.length).fill(false)

  await nextTick(() => {
    const elements = document.querySelectorAll('.timeline-item')

    elements.forEach((el, index) => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleItems.value[index] = true
            observer.unobserve(entry.target)
          }
        })
      })
      observer.observe(el)
    })
  })
})
</script>


<style module>
.timelineContainer {
  position: relative;
  border-left: 3px solid #d1d5db;
  margin-left: 2.5rem;
  margin-top: 2.5rem;
  color: #1F3A5F
}
.timelineItem {
  margin-bottom: 2.5rem;
  margin-left: 1.5rem;
  position: relative;
  opacity: 0;
  transform: translateY(3rem);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.timelineItem.visible {
  opacity: 1;
  transform: translateY(0);
}
.iconCircle {
  position: absolute;
  left: -3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: #93c5fd;
  border-radius: 9999px;
  color: white;
  font-size: 2rem;
  box-shadow: 0 0 0 4px #0769a2;
}
.dateText {
  font-size: 1rem;
  margin: 0 0 0.25rem 0.7rem;
}
.titleText {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0.7rem;
}
.descriptionText {
  font-size: 1.25rem;
  margin: 0 0 0 0.7rem;
}


@media(max-width: 768px){
  .timelineContainer {
    border-left: 3px solid #d1d5db;
    margin-left: 1.5rem;
    margin-top: 1.5rem;
  }
  .iconCircle {
    left: -2.5rem;
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
    box-shadow: 0 0 0 3px #0769a2;
  }
  .dateText {
    font-size: 0.75rem;
    margin: 0 0 0.25rem 0.25rem;
  }
  .titleText {
    font-size: 1.25rem;
    margin: 0 0 0.25rem 0.25rem;
  }
  .descriptionText {
    font-size: 1rem;
    margin: 0 0 0 0.25rem;
  }
}

@media(min-width: 2560px){
  .timelineContainer {
    border-left: 6px solid #d1d5db;
    margin-left: 4.55rem;
    margin-top: 4.55rem;
  }
  .iconCircle {
    left: -4.5rem;
    width: 6rem;
    height: 6rem;
    font-size: 4rem;
    box-shadow: 0 0 0 8px #0769a2;
  }
  .dateText {
    font-size: 2rem;
    margin: 0 0 0.4rem 3rem;
  }
  .titleText {
    font-size: 3rem;
    margin: 0 0 0.4rem 3rem;
  }
  .descriptionText {
    font-size: 2.5rem;
    margin: 0 0 0 3rem;
  }
}
</style>
