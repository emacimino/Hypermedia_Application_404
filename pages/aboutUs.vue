<!--This is the aboutUs's page-->
<template>
  <Title :title = "currentLang === 'en' ? '🪷Discover White Lotus!' : '🪷Scopri White Lotus!'"/>

  <div v-if="aboutUsContent">
    <!--first description-->
    <Presentation
        :title="currentLang === 'it' ? aboutUsContent.Title_it : aboutUsContent.Title"
        :paragraphs="currentLang === 'it' ? aboutUsContent.Paragraph_it : aboutUsContent.Paragraph"
        :image="aboutUsContent.Image"
        :alt="currentLang === 'it' ? `Una sala del centro` : `A center room`"
        :reverse="true"
    />
    <!--second description-->
    <Presentation
        :title="currentLang === 'it' ? aboutUsContent2!.Title_it : aboutUsContent2!.Title"
        :paragraphs="currentLang === 'it' ? aboutUsContent2!.Paragraph_it : aboutUsContent2!.Paragraph"
        :image="aboutUsContent2!.Image"
        :alt="currentLang === 'it' ? `` : ``"
        :reverse="false"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>

  <!--timeline with the history of the centre-->
  <Timeline/>

</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'
import { pageMeta } from '~/locales/pages'
import { useAboutUsStore } from '~/stores/aboutUs/aboutUsStore'
import Presentation from '~/components/Single_Elements/presentation.vue'
import Timeline from '~/components/Single_Elements/timeline.vue'
import Title from "~/components/Single_Elements/Title.vue";

const { currentLang } = useLanguage()
const aboutUsStore = useAboutUsStore()
const timelineStore = useTimelineStore()
const aboutUsContent = computed(() => aboutUsStore.content)
const aboutUsContent2 = computed(() => aboutUsStore.content2)

useHead({
  title: pageMeta.aboutUs.title[currentLang.value] || pageMeta.aboutUs.title.en,
  meta: [
    { name: 'description', content: pageMeta.aboutUs.description[currentLang.value] }
  ]
})

await useAsyncData('about-us', () => aboutUsStore.fetchAboutUs())
await useAsyncData('about-us', () => timelineStore.fetchTimeline(currentLang.value))

</script>

<style module>
</style>
