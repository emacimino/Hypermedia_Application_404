<!--This is the page with all teachers-->
<template>
  <div v-if="teacherStore.teacherCardsValues.length && teacherStore.teacherData.length && teacherStore.teacherData[0]">
    <!--nitial description-->
    <Presentation
        :title="teacherStore.teacherData[0].Title"
        :paragraphs="teacherStore.teacherData[0].Paragraph"
        :image="teacherStore.teacherData[0].Image"
        :alt="yogaClass"
        :reverse="true"
        class="px-4"
    />
    <!--grid with teachers-->
    <elemGrid :cards="teacherStore.teacherCardsValues" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>

</template>

<script setup lang="ts">
import {watch} from 'vue'
import Presentation from '~/components/Single_Elements/presentation.vue'
import { useLanguage } from '~/composables/useLanguage'
import { pageMeta } from '~/locales/pages'
import { useTeacherStore } from '~/stores/teachers/teacherPageStore'
import  elemGrid from '~/components/Grids/elemGrid.vue'
const teacherStore = useTeacherStore()
const { currentLang } = useLanguage()
const yogaClass = computed(() =>
    currentLang.value === 'it'
        ? 'L\'immagine di gruppo degli insegnanti'
        : 'The profile group of the teacher'
)
watch(currentLang, (lang) => {
  useHead({
    title: pageMeta.teacherPage.title[lang] || 'White Lotus teachers',
    meta: [
      { name: 'description', content: pageMeta.teacherPage.description[lang] }
    ]
  })
}, { immediate: true })

onMounted(() => {
  teacherStore.fetchTeachers(currentLang.value)
})

watch(currentLang, (lang) => {
  teacherStore.fetchTeachers(lang)
})
</script>

<style module>
</style>
