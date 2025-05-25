<template>
  <Presentation
      :title="t('pages.activities.title')"
      :paragraphs="t('pages.activities.description')"
      image="/presentation1.png"
      :reverse="true"
  />
  <elemGrid :cards="cards"></elemGrid>
</template>

<script setup>
import ElemGrid from "~/components/elemGrid.vue";
import { useAsyncData } from "#app";
import { useLanguage } from '~/composables/useLanguage'
const { t } = useLanguage()
const supabase = useSupabaseClient()

const { data: cards } = await useAsyncData('cards', async () => {
  const { data } = await supabase.from('Activities').select('*')
  return data ?? []
})
</script>

<style  module>
</style>