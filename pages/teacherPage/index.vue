<template>
  <div v-if="teacherStore.teacherCardsValues.length && teacherStore.teacherData.length && teacherStore.teacherData[0]">
    <Presentation
        :title="teacherStore.teacherData[0].Title"
        :paragraphs="teacherStore.teacherData[0].Paragraph"
        :image="teacherStore.teacherData[0].Image"
        :reverse="true"
        class="px-4"
    />
    <elemGrid :cards="teacherStore.teacherCardsValues" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>

</template>

<script setup lang="ts">
import {watch} from 'vue'
import ElemGrid from '~/components/Grids/elemGrid.vue'
import Presentation from '~/components/Single_Elements/presentation.vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import { pageMeta } from '~/locales/pages'
import { useTeacherStore } from '~/stores/teacherPageStore'
const teacherStore = useTeacherStore()
const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

watch(currentLang, (lang) => {
  useHead({
    title: pageMeta.teacherPage.title[lang] || 'White Lotus teachers',
    meta: [
      { name: 'description', content: pageMeta.teacherPage.description[lang] }
    ]
  })
}, { immediate: true })

onMounted(() => {
  teacherStore.fetchTeachers(currentLang.value, supabase)
})

watch(currentLang, (lang) => {
  teacherStore.fetchTeachers(lang, supabase)
})
</script>

<style module>
</style>
