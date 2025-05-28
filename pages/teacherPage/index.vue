<template>
  <div v-if="retrievedData && retrievedData.cardsTeachers.length && retrievedData.teachData.length">
    <Presentation
        :title="retrievedData.teachData[0].Title"
        :paragraphs="retrievedData.teachData[0].Paragraph"
        :image="retrievedData.teachData[0].Image"
        :reverse="true"
        class="px-4"
    />
    <elemGrid :cards="retrievedData.cardsTeachers" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ElemGrid from '~/components/elemGrid.vue'
import Presentation from '~/components/presentation.vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

interface RawTeacher {
  Id: number
  Image: string
  Link: string
  Title: string
  ShortDescription_it: string
  ShortDescription: string
}

interface RawPresentation {
  Title: string
  Title_it: string
  Paragraph: string
  Paragraph_it: string
  Image: string
}

const retrievedData = ref<{ teachData: RawPresentation[]; cardsTeachers: any[] } | null>(null)

const fetchData = async () => {
  const { data: teachRaw, error: teachError } = await supabase
      .from('Presentation')
      .select('Title, Title_it, Paragraph, Paragraph_it, Image')
      .eq('Title', 'Our qualified team')

  const { data: cardsRaw, error: cardsError } = await supabase
      .from('Teachers')
      .select('*')

  if (teachError || cardsError) {
    console.error('Errore nel fetch:', teachError?.message || cardsError?.message)
    return
  }

  const teachData = (teachRaw ?? []).map((item: RawPresentation) => ({
    Title: currentLang.value === 'it' ? item.Title_it : item.Title,
    Paragraph: currentLang.value === 'it' ? item.Paragraph_it : item.Paragraph,
    Image: item.Image,
  }))

  const cardsTeachers = (cardsRaw ?? []).map((item: RawTeacher) => ({
    Id: item.Id,
    Image: item.Image,
    Link: item.Link,
    Title: item.Title,
    ShortDescription: currentLang.value === 'it' ? item.ShortDescription_it : item.ShortDescription,
  }))

  retrievedData.value = { teachData, cardsTeachers }
}

onMounted(fetchData)
watch(currentLang, fetchData)
</script>

<style module>
</style>
