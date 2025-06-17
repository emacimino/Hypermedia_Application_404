<template>
  <Title :title = "title"/>

  <div :class="$style.gridContainer">
    <singleHighlightCard
        v-for="(card, index) in highlightsStore.highlights"
        :key="index"
        :card="card"/>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import {pageMeta} from "~/locales/pages";
import Title from "~/components/Title.vue"

import singleHighlightCard from '~/components/Single_Elements/singleHighlightCard.vue'
import {useHighlightsStore} from "~/stores/highlightsStore";

const highlightsStore = useHighlightsStore()
const supabase = useSupabaseClient()

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

@media (max-width: 768px) {
  .gridContainer{
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    padding: var(--padding);
  }
}
</style>