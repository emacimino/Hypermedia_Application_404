<template>
  <h1 :class="[$style.Title, showTitle ? $style.titleEnter : '']">
    {{ title }}
  </h1>

  <div :class="$style.gridContainer">
    <singleHighlightCard
        v-for="(card, index) in highlightsStore.highlights"
        :key="index"
        :card="card"/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import { onMounted } from 'vue'
import {pageMeta} from "~/locales/pages";

import singleHighlightCard from '~/components/Single_Elements/singleHighlightCard.vue'
import {useHighlightsStore} from "~/stores/highlightsStore";

const highlightsStore = useHighlightsStore()
const supabase = useSupabaseClient()
const showTitle = ref(false)

onMounted(() => {
  if (document.readyState === 'complete') {
    setTimeout(() => {
      showTitle.value = true
    }, 300)
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        showTitle.value = true
      }, 300)
    })
  }

  setTimeout(() => {
    showTitle.value = true
  }, 2000)

})
const { currentLang } = useLanguage()
watch(currentLang, (lang) => {
  useHead({
    title: pageMeta.highlights.title[lang] || 'White Lotus Activities',
    meta: [
      { name: 'description', content: pageMeta.highlights.description[lang] }
    ]
  })
}, { immediate: true })

const title = computed(() => {
  const t = highlightsStore.title
  if (!t) return ''
  return currentLang.value === 'it' ? t.Title_it : t.Title
})
watch(currentLang, () => {
  highlightsStore.fetchHighlights(supabase)
  highlightsStore.fetchTitle(supabase)
}, { immediate: true })


</script>

<style module>
.gridContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: var(--gap);
  padding: var(--padding);
}
.Title {
  font-size: 4.5rem;
  padding: var(--padding);
  font-weight: bold;
  font-family: 'Rounded Mplus 1c Bold', serif;
  color:#0769a2;
  text-align: center;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}
@keyframes fadeSlideDown {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.titleEnter {
  animation: fadeSlideDown 0.8s ease-out forwards;
}
.Title:not(.titleEnter) {
  opacity: 0;
  transform: translateY(-30px);
}


@media (max-width: 768px) {
  .Title{
    font-size: 2rem;
  }
  .gridContainer{
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    padding: var(--padding);
  }
}

@media (min-width: 2560px) {
  .Title{
    font-size: 7.5rem;
  }
}
</style>