<template>

    <!-- Reusable header section -->
    <Presentation
        title="Our qualified team"
        :paragraphs="[
        'Our teaching team is the heart of our course — a group of passionate, certified professionals dedicated to guiding you with care, expertise, and authenticity on your journey.',
        'Each instructor brings a unique blend of experience, training, and insight, creating a supportive, engaging, and inclusive space for all participants.',
        'Whether you\'re joining us for meditation, yoga, or functional training, our teachers skillfully adapt each session to meet your needs, offering personalized guidance and encouraging a mindful, sustainable practice.',
        'With empathy, presence, and a deep commitment to your growth, our team is here not just to teach — but to inspire, support, and walk alongside you every step of the way.'
         ]"

        image="/image 11.png"
        :reverse="true"
    />
  <elemGrid :activities="teachers"></elemGrid>


</template>

<script setup>
import SingleActivityCard from "~/components/singleActivityCard.vue";
import ElemGrid from "~/components/elemGrid.vue";
import { useAsyncData } from "#app";

const supabase = useSupabaseClient()

// Fetching the data from the Teachers table
const { data: teachers, error } = await useAsyncData('teachers', async () => {
  const { data, error } = await supabase.from('Teachers').select('*')
  if (error) {
    console.error('Error fetching teachers:', error)
    throw error // important for Nuxt to register it as a real error
  }
  return data ?? []
})
</script>


<style  module>

</style>

<style  module>

</style>
