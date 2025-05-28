<template>
  <div v-if="fetchedData && fetchedData.cards && fetchedData.presData">
    <Presentation
        v-if="fetchedData.presData.length"
        :title="fetchedData.presData[0].Title"
        :paragraphs="fetchedData.presData[0].Paragraph"
        :image="fetchedData.presData[0].Image"
        :reverse="true"
        class="px-4"
    />
    <elemGrid v-if="fetchedData.cards.length" :cards="fetchedData.cards" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import ElemGrid from '~/components/elemGrid.vue'
import Presentation from '~/components/presentation.vue'
import { useAsyncData } from '#app'
import { useSupabaseClient } from '#imports'
import {useLanguage} from "~/composables/useLanguage";
const { currentLang } = useLanguage();

const supabase = useSupabaseClient()

interface RawActivity {
  Id: number;
  Title_it: string;
  Title: string;
  ShortDescription_it: string;
  ShortDescription: string;
  Image: string;
}

const { data: fetchedData, error } = await useAsyncData('presentationData', async () => {
  const { data: presRaw, error: presError } = await supabase
      .from('Presentation')
      .select('*')

  const { data: cardsData, error: cardsError } = await supabase
      .from('Activities')
      .select('*')

  if (presError || cardsError) {
    console.error('❌ Errore nel fetch:', presError?.message || cardsError?.message)
    throw presError || cardsError
  }

  const presData = presRaw?.map((item) => ({
    Title: currentLang.value === 'it' ? item.Title_it : item.Title,
    Paragraph: currentLang.value === 'it' ? item.Paragraph_it : item.Paragraph,
    Image: item.Image
  })) ?? []

  // Create translated card objects from cardsData
  const cards = Array.isArray(cardsData)
      ? cardsData.map((item) => ({
        Id: item.Id,
        Image: item.Image,
        Link: item.Link,
        Title: currentLang.value === 'it' ? item.Title_it : item.Title,
        ShortDescription: currentLang.value === 'it' ? item.ShortDescription_it : item.ShortDescription_it
      }))
      : []

  return { presData, cards, cardsData }
})


</script>

<style  module>
</style>