<template>
  <div
      ref="packagesTitleRef"
      :class="[$style.packetsTitle, { [$style.titleVisible]: showPackagesTitle }]"
      class="packages-title"
  >
    <h2>🎁 {{currentLang  == 'it' ? 'I nostri pacchetti' : 'Our Packages' }}</h2>
  </div>

  <div :class="$style.courseGrid">
    <Packet
        v-for="packet in packetStore.packets"
        :id="packet.id"
        :price="packet.price"
        :duration="packet.duration"
        :color="packet.color"
    />
  </div>
</template>

<script setup lang="ts">
import Packet from "~/components/Single_Elements/packet.vue";
import { usePacketStore } from '~/stores/homeRelatedStores/packetStores'
import {nextTick, onMounted, ref, watch} from "vue";
import {useLanguage} from "~/composables/useLanguage";
import {useSupabaseClient} from "#imports";

const packetStore = usePacketStore()
const { currentLang } = useLanguage()
const supabase = useSupabaseClient()
const showPackagesTitle = ref(false)
const packagesTitleRef = ref<HTMLElement | null>(null)

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

watch(currentLang, () => {
  packetStore.fetchPackets(currentLang.value, supabase)
}, { immediate: true })
</script>

<style module>
.courseGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: var(--gap);
  padding: var(--padding);
  place-items: center;
}

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
  .courseGrid {
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  }
  .packetsTitle {
    font-size: 2.5rem;
  }
}

@media (min-width: 2560px) {
  .courseGrid {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  }
  .packetsTitle {
    font-size: 8rem;
  }
}
</style>