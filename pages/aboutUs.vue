<template>
  <Title :title = "currentLang === 'en' ? '🪷Discover White Lotus!' : '🪷Scopri White Lotus!'"/>

  <div v-if="aboutUsContent">
    <Presentation
        :title="currentLang === 'it' ? aboutUsContent.Title_it : aboutUsContent.Title"
        :paragraphs="currentLang === 'it' ? aboutUsContent.Paragraph_it : aboutUsContent.Paragraph"
        :image="aboutUsContent.Image"
        :alt="currentLang === 'it' ? `Una sala del centro` : `A center room`"
        :reverse="true"
    />
    <Presentation
        :title="currentLang === 'it' ? aboutUsContent2!.Title_it : aboutUsContent2!.Title"
        :paragraphs="currentLang === 'it' ? aboutUsContent2!.Paragraph_it : aboutUsContent2!.Paragraph"
        :image="aboutUsContent2!.Image"
        :alt="currentLang === 'it' ? `Un momento del corso` : `A course moment`"
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
import Presentation from '~/components/Single_Elements/presentation.vue'
import Timeline from '~/components/timeline.vue'
import Title from "~/components/Title.vue";

const supabase = useSupabaseClient()
const { currentLang } = useLanguage()
const aboutUsStore = useAboutUsStore()
const aboutUsContent = computed(() => aboutUsStore.content)
const aboutUsContent2 = computed(() => aboutUsStore.content2)

useHead({
  title: pageMeta.aboutUs.title[currentLang.value] || pageMeta.aboutUs.title.en,
  meta: [
    { name: 'description', content: pageMeta.aboutUs.description[currentLang.value] }
  ]
})

onMounted(async () => {
  await aboutUsStore.fetchAboutUs(supabase)
  await aboutUsStore.fetchSecondAboutUs(supabase)
})
</script>

<style module>
</style>
