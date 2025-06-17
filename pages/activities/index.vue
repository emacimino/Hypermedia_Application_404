<template>
  <div v-if="activityStore.cardsValues.length && activityStore.presentationData.length">
    <Presentation
        :title="activityStore.presentationData[0].Title"
        :paragraphs="activityStore.presentationData[0].Paragraph"
        :image="activityStore.presentationData[0].Image"
        :reverse="true"
        class="px-4"
    />
    <elemGrid :cards="activityStore.cardsValues" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import {watch} from 'vue'
import ElemGrid from '~/components/Grids/elemGrid.vue'
import Presentation from '~/components/Single_Elements/presentation.vue'
import { useLanguage } from '~/composables/useLanguage'
import {pageMeta} from "~/locales/pages";
import { useActivityStore } from '~/stores/activities/activityPageStore'
const activityStore = useActivityStore()
const { currentLang } = useLanguage()

watch(currentLang, (lang) => {
  useHead({
    title: pageMeta.activityPage.title[lang] || 'White Lotus Activities',
    meta: [
      { name: 'description', content: pageMeta.activityPage.description[lang] }
    ]
  })
}, { immediate: true })

watch(currentLang, async (lang) => {
  try {
    await activityStore.fetchActivities(lang)
  } catch (e) {
    console.error('Errore fetch:', e)
    navigateTo('/errore-connessione')
  }
}, { immediate: true })
</script>

<style  module>
</style>