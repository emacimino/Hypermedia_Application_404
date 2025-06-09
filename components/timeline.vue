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

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

interface TimelineItem {
  Date: string
  Icon: string
  Title: string
  Title_it?: string
  Description: string
  Description_it?: string
}

const items = ref<TimelineItem[]>([])
const visibleItems = ref<boolean[]>([])

const fetchTimeline = async () => {
  const { data, error } = await supabase
      .from('Timeline')
      .select('*')
      .order('Date', { ascending: true })

  if (error) {
    console.error('Errore nel caricamento della timeline:', error)
    return
  }

  items.value = data || []
  visibleItems.value = Array(data?.length || 0).fill(false)
}

const translatedItems = computed(() =>
    items.value.map(item => ({
      ...item,
      Title: currentLang.value === 'it' ? item.Title_it : item.Title,
      Description: currentLang.value === 'it' ? item.Description_it : item.Description,
    }))
)

onMounted(async () => {
  await fetchTimeline()
  nextTick(() => {
    const elements = document.querySelectorAll('.timeline-item')

    elements.forEach((el, index) => {
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
