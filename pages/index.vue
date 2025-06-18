<template>
  <div class="w-full aspect-video max-h-[80vh]">
    <flow-image :images="slideStore.slides" />
  </div>

  <div class="flex flex-row">
    <Presentation
        v-if="firstPresentation"
        :title="currentLang === 'it' ? firstPresentation.Title_it : firstPresentation.Title"
        :paragraphs="currentLang === 'it' ? firstPresentation.Paragraph_it : firstPresentation.Paragraph"
        :image="firstPresentation.Image"
        :alt="yogaClass"
        :reverse="true"
        :aboutInfo="true"

    />
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>

  <Presentation
      v-if="secondPresentation"
      :title="currentLang === 'it' ? secondPresentation.Title_it : secondPresentation.Title"
      :paragraphs="currentLang === 'it' ? secondPresentation.Paragraph_it : secondPresentation.Paragraph"
      :reverse="false"
      :calendar="true"
  />
  <div v-else>
    <p>Loading...</p>
  </div>

  <div
      ref="packagesTitleRef"
      :class="[$style.packetsTitle, { [$style.titleVisible]: showPackagesTitle }]"
      class="packages-title"
  >
    <h2>🎁 {{currentLang  == 'it' ? 'I nostri pacchetti' : 'Our Packages' }}</h2>
  </div>

  <PacketGrid :packets="packetStore.packets"/>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import Presentation from '~/components/Single_Elements/presentation.vue'
import {pageMeta} from '~/locales/pages'
import { useHomePresentationStore } from '~/stores/homeRelatedStores/homePresentationStore'
import PacketGrid from "~/components/Grids/packetGrid.vue";
import { useSlideStore } from '~/stores/homeRelatedStores/slideshow'
import { usePacketStore } from '~/stores/homeRelatedStores/packetStores'

const packetStore = usePacketStore()
const { currentLang } = useLanguage()
const yogaClass = "yoga"
const homeStore = useHomePresentationStore()
const slideStore = useSlideStore()
const { firstPresentation, secondPresentation } = storeToRefs(homeStore)

watch(currentLang, (lang) => {
  useHead({
    title: pageMeta.index.title[lang] || 'White Lotus',
    meta: [
      { name: 'description', content: pageMeta.index.description[lang] }
    ]
  })
  homeStore.fetchPresentationContent()
  slideStore.fetchImages(currentLang.value)
  packetStore.fetchPackets(currentLang.value)
}, { immediate: true })

const showPackagesTitle = ref(false)

const setupTitleAnimation = () => {
  nextTick(() => {
    const titleElement = document.querySelector('.packages-title')

    if (titleElement) {
      const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                showPackagesTitle.value = true
                observer.unobserve(entry.target)
              }
            })
          },
          {
            threshold: 0.1,
            rootMargin: '-100px 0px -100px 0px'
          }
      )
      observer.observe(titleElement)
    }
  })
}

onMounted(() => {
  setupTitleAnimation()
})
</script>

<style module>
.packetsTitle {
  margin-top: 2rem;
  font-size: 5rem;
  font-weight: bold;
  font-family: 'Rounded Mplus 1c Bold', serif;
  color: #0769a2;
  text-align: center;
  text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.6);
  opacity: 0;
  transform: translateX(-200px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.packetsTitle.titleVisible {
  opacity: 1;
  transform: translateX(0);
}


@media (max-width: 768px) {
  .packetsTitle {
    font-size: 2.5rem;
  }
}

@media (min-width: 2560px) {
  .packetsTitle {
    font-size: 8rem;
  }
}
</style>