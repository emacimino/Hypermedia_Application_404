<template>
  <div v-if="fetchedData && fetchedData.cards.length && fetchedData.presData.length">
    <Presentation
        :title="fetchedData.presData[0].Title"
        :paragraphs="fetchedData.presData[0].Paragraph"
        :image="fetchedData.presData[0].Image"
        :reverse="true"
    />
    <elemGrid :cards="fetchedData.cards" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import ElemGrid from '~/components/elemGrid.vue'
import Presentation from '~/components/presentation.vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

interface RawActivity {
  Id: number
  Title_it: string
  Title: string
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

const fetchedData = ref<{ presData: PresentationItem[]; cards: RawActivity[] } | null>(null)

const fetchData = async () => {
  const { data: presRaw } = await supabase.from('Presentation').select('*')
  const { data: cardsRaw } = await supabase.from('Activities').select('*')

  const presData = (presRaw || []).map((item) => ({
    Title: currentLang.value === 'it' ? item.Title_it : item.Title,
    Paragraph: currentLang.value === 'it' ? item.Paragraph_it : item.Paragraph,
    Image: item.Image,
  }))

  const cards = (cardsRaw || []).map((item) => ({
    Id: item.Id,
    Image: item.Image,
    Link: item.Link,
    Title: currentLang.value === 'it' ? item.Title_it : item.Title,
    ShortDescription: currentLang.value === 'it' ? item.ShortDescription_it : item.ShortDescription,
  }))

  fetchedData.value = { presData, cards }
}

// Esegui il fetch iniziale
onMounted(fetchData)

// Reagisci al cambio lingua
watch(currentLang, fetchData)


</script>

<style  module>
</style>