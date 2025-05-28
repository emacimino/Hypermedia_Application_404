<template>
  <div v-if="retrievedData && retrievedData.cardsTeachers && retrievedData.teachData">
    <Presentation
        v-if="retrievedData.teachData.length"
        :title="retrievedData.teachData[0].Title"
        :paragraphs="retrievedData.teachData[0].Paragraph"
        :image="retrievedData.teachData[0].Image"
        :reverse="true"
        class="px-4"

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
import {useLanguage} from "~/composables/useLanguage";
const { currentLang } = useLanguage();

const supabase = useSupabaseClient()

const { data: retrievedData, error  } = await useAsyncData('teachers', async () => {
  const { data: teachRaw, error: teachError } = await supabase
      .from("Presentation")
      .select('Title, Title_it, Paragraph, Paragraph_it, Image')
      .eq('Title', 'Our qualified team')

  const { data: cardsRaw, error: cardsError } = await supabase
      .from("Teachers")
      .select("*");

  if (teachError || cardsError) {
    console.error("Errore nel fetch:", teachError?.message || cardsError?.message);
    throw teachError || cardsError;
  }
  const teachData = (teachRaw ?? []).map((item) => ({
    Title: currentLang.value === "it" ? item.Title_it : item.Title,
    Paragraph: currentLang.value === "it" ? item.Paragraph_it : item.Paragraph,
    Image: item.Image,
  }));

  const cardsTeachers = (cardsRaw ?? []).map((item) => ({
    Id: item.Id,
    Image: item.Image,
    Link: item.Link,
    Title: item.Title,
    ShortDescription: currentLang.value === "it" ? item.ShortDescription_it : item.ShortDescription,
  }));

  return {
    teachData,
    cardsTeachers,
    cardsRaw,
  };
});
console.log(retrievedData);
</script>

<style  module>

</style>
