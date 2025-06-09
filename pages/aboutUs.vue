<template>
  <div v-if="aboutUsContent">
    <Presentation
        :title="currentLang === 'it' ? aboutUsContent.Title_it : aboutUsContent.Title"
        :paragraphs="currentLang === 'it' ? aboutUsContent.Paragraph_it : aboutUsContent.Paragraph"
        :image="aboutUsContent.Image"
        :alt="currentLang === 'it' ? `Una sala del centro` : `A center room`"
        :reverse="true"
    />
  </div>
  <div v-else>
    <p>Loading...</p>

  </div>
  <Timeline/>



</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import Presentation from '~/components/presentation.vue'
import Timeline from '~/components/timeline.vue'
import { pageTitles } from '~/locales/pages'

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()
useHead({
  title: pageTitles.aboutUs[currentLang.value] || pageTitles.aboutUs.en
})
interface PresentationContent {
  id: number
  Title: string
  Paragraph: string
  Image: string
  Title_it: string
  Paragraph_it: string
}

const { data: aboutUsContent } = await useAsyncData<PresentationContent | null>('aboutUs', async () => {
  const { data, error } = await supabase
      .from('Presentation')
      .select('*')
      .eq('Id', 3)
      .single()

  if (error) console.error('Errore Supabase:', error)
  return data
})

</script>

<style module>

</style>
