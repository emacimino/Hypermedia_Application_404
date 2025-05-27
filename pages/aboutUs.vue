<template>
  <Presentation
      :title="t('pages.aboutUs.title')"
      :paragraphs="t('pages.aboutUs.description')"
      image="/image 19.png"
      :reverse="true"
  />
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'
const { t } = useLanguage()
</script>

<style module>
</style>
