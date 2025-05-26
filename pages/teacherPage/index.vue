<template>
  <div v-if="retrievedData && retrievedData.cardsTeachers && retrievedData.teachData">
    <Presentation
        v-if="retrievedData.teachData.length"
        :title="retrievedData.teachData[0].title"
        :paragraphs="retrievedData.teachData[0].paragraphs"
        :image="retrievedData.teachData[0].image"
        :reverse="true"
    />
    <elemGrid v-if="retrievedData.cardsTeachers.length" :cards="retrievedData.cardsTeachers" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import ElemGrid from "~/components/elemGrid.vue";
import { useAsyncData } from "#app";
import Presentation from "~/components/presentation.vue";

const supabase = useSupabaseClient()

const { data: retrievedData, error  } = await useAsyncData('teachers', async () => {
  const { data: teachData, error: teachError } = await supabase
      .from('Presentation')
      .select('title, paragraphs, image')
      .eq('title', 'Our qualified team')



  const { data: cardTeachers, error: teachCardError } = await supabase.from('Teachers').select('*')

  if (teachError) {
    console.error('❌ Errore nella tabella Presentation:', teachError.message)
  }

  if (teachCardError) {
    console.error('❌ Errore nella tabella Activities:', teachCardError.message)
  }
  return {
    teachData: teachData ?? [],
    cardsTeachers: Array.isArray(cardTeachers) ? cardTeachers : []
  }})
console.log(retrievedData);
</script>

<style  module>

</style>
