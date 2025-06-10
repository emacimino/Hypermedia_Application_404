<template>
  <div class="w-full aspect-video max-h-[80vh]">
    <flow-image :images="slideStore.slides" />
  </div>

  <div class="flex flex-row">
    <Presentation
        v-if="firstPresentation"
        :title="currentLang === 'it' ? firstPresentation.Title_it : firstPresentation.Title"
        :paragraphs="currentLang === 'it' ? firstPresentation.Paragraph_it : firstPresentation.Paragraph"
        :image="firstPresentation.Image"
        :alt="yogaClass"
        :reverse="true"
    />
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>

  <Presentation
      v-if="secondPresentation"
      :title="currentLang === 'it' ? secondPresentation.Title_it : secondPresentation.Title"
      :paragraphs="currentLang === 'it' ? secondPresentation.Paragraph_it : secondPresentation.Paragraph"
      :reverse="false"
      :calendar="true"
  />
  <div v-else>
    <p>Loading...</p>
  </div>

  <PacketGrid/>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import Presentation from '~/components/Single_Elements/presentation.vue'
import {pageMeta} from '~/locales/pages'

import { useHomePresentationStore } from '~/stores/homePresentationStore'
import PacketGrid from "~/components/Grids/packetGrid.vue";
import { useSlideStore } from '~/stores/slideshow'


const supabase = useSupabaseClient()
const { currentLang } = useLanguage()
const yogaClass = "yoga"

const images = ref<Array<{ Title: string; ImageUrl: string; Course_Id: number }>>([])

const homeStore = useHomePresentationStore()
const slideStore = useSlideStore()

const { firstPresentation, secondPresentation } = storeToRefs(homeStore)


watch(currentLang, (lang) => {
  useHead({
    title: pageMeta.index[lang] || 'White Lotus',
    meta: [
      { name: 'description', content: pageMeta.index.description[currentLang] }
    ]
  })
  homeStore.fetchPresentationContent(supabase)

}, { immediate: true })






onMounted(() => {
  slideStore.fetchImages(currentLang,supabase)
  homeStore.fetchPresentationContent(supabase)
})
</script>

<style module>

</style>