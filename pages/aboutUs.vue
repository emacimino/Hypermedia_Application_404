<template>
  <div v-if="aboutUsContent">
    <Presentation
        :title="currentLang === 'it' ? aboutUsContent.Title_it : aboutUsContent.Title"
        :paragraphs="currentLang === 'it' ? aboutUsContent.Paragraph_it : aboutUsContent.Paragraph"
        :image="aboutUsContent.Image"
        :alt="currentLang === 'it' ? `Una sala del centro` : `A center room`"
        :reverse="true"
    />
    <Presentation
        :title="currentLang === 'it' ? aboutUsContent.Title_it : aboutUsContent.Title"
        :paragraphs="currentLang === 'it' ? aboutUsContent.Paragraph_it : aboutUsContent.Paragraph"
        :image="aboutUsContent.Image"
        :alt="currentLang === 'it' ? `Una sala del centro` : `A center room`"
        :reverse="false"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <Timeline/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import { pageMeta } from '~/locales/pages'
import { useAboutUsStore } from '~/stores/aboutUsStore'
import { storeToRefs } from 'pinia'
import Presentation from '~/components/Single_Elements/presentation.vue'
import Timeline from '~/components/timeline.vue'

const supabase = useSupabaseClient()
const { currentLang } = useLanguage()
const aboutUsStore = useAboutUsStore()
const { content: aboutUsContent } = storeToRefs(aboutUsStore)

useHead({
  title: pageMeta.aboutUs.title[currentLang.value] || pageMeta.aboutUs.title.en,
  meta: [
    { name: 'description', content: pageMeta.aboutUs.description[currentLang.value] }
  ]
})

onMounted(() => {
  aboutUsStore.fetchAboutUs(supabase)
})
</script>

<style module>

</style>
