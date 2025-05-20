<template>
    <Presentation
        title="Our qualified team"
        paragraphs="Our teaching team is the heart of our course — a group of passionate, certified professionals dedicated
        to guiding you with care, expertise, and authenticity on your journey. Each instructor brings a unique blend of experience,
        training, and insight, creating a supportive, engaging, and inclusive space for all participants. Whether you're joining us
        for meditation, yoga, or functional training, our teachers skillfully adapt each session to meet your needs, offering
        personalized guidance and encouraging a mindful, sustainable practice. With empathy, presence, and a deep commitment to
        your growth, our team is here not just to teach — but to inspire, support, and walk alongside you every step of the way."
        image="/TeacherGroup.png"
        :reverse="true"
    />
  <elemGrid :cards="cards"></elemGrid>
</template>

<script setup>
import ElemGrid from "~/components/elemGrid.vue";
import { useAsyncData } from "#app";

const supabase = useSupabaseClient()

const { data: cards } = await useAsyncData('teachers', async () => {
  const { data } = await supabase.from('Teachers').select('*')
  return data ?? []
})
</script>

<style  module>

</style>
