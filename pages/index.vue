<template>
  <flow-image :images="images" />
  <Presentation
      :title="t('pages.index.section1.title')"
      :paragraphs="t('pages.index.section1.description')"
      image="/presentation1.png"
      :reverse="true"
  />
  <Presentation
      :title="t('pages.index.section2.title')"
      :paragraphs="t('pages.index.section2.description')"
      image="/calendar.png"
      :reverse="false"
  />
  <div :class="$style.courseGrid">
    <Packet price="€50" type="Monthly" color="#d0f4c5" />
    <Packet price="€130" type="Quarterly" color="#a9e5a3" />
    <Packet price="€240" type="Semiannual" color="#00c853" />
    <Packet price="€450" type="Annual" color="#1b5e20" />
    <Packet price="€30" type="Single lesson" color="#ffcdd2" />
    <Packet price="50" type="5 lessons package" color="#ef9a9a" />
    <Packet price="85" type="10 lessons package" color="#f44336" />
    <Packet price="€150" type="20 lessons package" color="#b71c1c" />
    <Packet price="€30" type="Private lesson" color="#9c27b0" />
    <Packet price="€20" type="Mandatory membership card" color="#2196f3" />
  </div>

</template>

<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'
import packet from '../components/packet.vue'
import {useAsyncData} from "#app";
const { data: images, error } = await useAsyncData('images', async () => {
  const { data: imageArray, error: imageError } = await supabase
      .from('Slideshow')
      .select('Title, ImageUrl')

  if (imageError) {
    console.error('❌ Errore nella tabella Slideshow:', imageError.message)
  }

  return imageArray ?? []
})
console.log(images);
const { t } = useLanguage()
</script>

<style module>
.container {
  position: relative;
  display: inline-block;
}
.image22Icon {
  width: 100%;
  height: auto;
  display: block;
}
.hathaYogaCourse {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100px, 200px);
  color: #1f3a5f;
  padding: 8px;
  font-size: 64px;
}
.courseGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--gap);
  padding: var(--padding);
}
</style>
