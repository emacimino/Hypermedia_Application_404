<template>
  <div v-if="fetchedData && fetchedData.cards && fetchedData.presData">
    <Presentation
        v-if="fetchedData.presData.length"
        :title="fetchedData.presData[0].title"
        :paragraphs="fetchedData.presData[0].paragraphs"
        :image="fetchedData.presData[0].image"
        :reverse="true"
    />
    <elemGrid v-if="fetchedData.cards.length" :cards="fetchedData.cards" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import ElemGrid from '~/components/elemGrid.vue'
import Presentation from '~/components/presentation.vue'
import { useAsyncData } from '#app'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()

const { data: fetchedData, error } = await useAsyncData('presentationData', async () => {
  const { data: presData, error: presError } = await supabase
      .from('Presentation')
      .select('title, paragraphs, image')
      .eq('title', 'What do we offer?')

  if (presError) {
    console.error('❌ Errore nella tabella Presentation:', presError.message)
  }

  const { data: cardsData, error: cardsError } = await supabase
      .from('Activities')
      .select('*')

  if (cardsError) {
    console.error('❌ Errore nella tabella Activities:', cardsError.message)
  }

  return {
    presData: presData ?? [],
    cards: Array.isArray(cardsData) ? cardsData : []
  }
})

</script>

<style  module>
</style>