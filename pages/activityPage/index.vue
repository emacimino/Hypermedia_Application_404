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
import {useSupabaseClient} from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import {pageMeta} from "~/locales/pages";
import { useActivityStore } from '~/stores/activityPageStore'
const activityStore = useActivityStore()
const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

watch(currentLang, (lang) => {
  useHead({
    title: pageMeta.activityPage.title[lang] || 'White Lotus Activities',
    meta: [
      { name: 'description', content: pageMeta.activityPage.description[lang] }
    ]
  })
}, { immediate: true })

onMounted(() => {
  activityStore.fetchActivities(currentLang.value, supabase)
})

watch(currentLang, (lang) => {
  activityStore.fetchActivities(lang, supabase)
})
</script>

<style  module>
</style>