<template>
  <div :class="$style.aboutUs">
    <Presentation
        :title="t('pages.aboutUs.title')"
        :paragraphs="t('pages.aboutUs.description')"
        image="/image 19.png"
        :reverse="true"
    />
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()
</script>

<style module>
.aboutUs {
  width: 100%;
  position: relative;
  overflow: hidden;
  text-align: left;
  font-size: 64px;
  color: #1f3a5f;
  font-family: Inter;
}
</style>
