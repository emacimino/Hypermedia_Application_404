<template>
  <div v-if="fetchedData && fetchedData.cards.length && fetchedData.presData.length">
    <Presentation
        :title="fetchedData.presData[0].Title"
        :paragraphs="fetchedData.presData[0].Paragraph"
        :image="fetchedData.presData[0].Image"
        :reverse="true"
        class="px-4"
    />
    <elemGrid :cards="fetchedData.cards" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ElemGrid from '~/components/elemGrid.vue'
import Presentation from '~/components/presentation.vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

interface RawActivity {
  Id: number
  Title: string
  Title_it: string
  ShortDescription_it: string
  ShortDescription: string
  Image: string
  Link: string
}

interface PresentationItem {
  Title: string
  Paragraph: string
  Image: string
}
interface RawPresentation {
  Title: string
  Title_it: string
  Paragraph: string
  Paragraph_it: string
  Image: string
}

const fetchedData = ref<{ presData: PresentationItem[]; cards: RawActivity[] } | null>(null)

const fetchData = async () => {
  const { data: presRaw } = await supabase.from('Presentation').select('*').eq('Id', 6)
  const { data: cardsRaw } = await supabase.from('Activities').select('*')

  const presData = ((presRaw || []) as RawPresentation[]).map((item) => ({
    Title: currentLang.value === 'it' ? item.Title_it : item.Title,
    Paragraph: currentLang.value === 'it' ? item.Paragraph_it : item.Paragraph,
    Image: item.Image,
  }))

  const cards = ((cardsRaw || []) as RawActivity[]).map((item) => ({
    Id: item.Id,
    Image: item.Image,
    Link: item.Link,
    Title: currentLang.value === 'it' ? item.Title_it : item.Title,
    Title_it: currentLang.value === 'en' ? item.Title : item.Title_it,
    ShortDescription: currentLang.value === 'it' ? item.ShortDescription_it : item.ShortDescription,
    ShortDescription_it: currentLang.value === 'en' ? item.ShortDescription : item.ShortDescription_it,
  }))

  fetchedData.value = { presData, cards }
}

onMounted(fetchData)

watch(currentLang, fetchData)
</script>

<style  module>
</style>