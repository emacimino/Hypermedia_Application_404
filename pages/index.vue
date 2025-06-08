<template>
  <div class="w-full aspect-video max-h-[80vh]">
    <flow-image :images="images" />
  </div>

  <div class="flex flex-row">
    <Presentation
        v-if="homePageContent"
        :title="currentLang === 'it' ? homePageContent.Title_it : homePageContent.Title"
        :paragraphs="currentLang === 'it' ? homePageContent.Paragraph_it : homePageContent.Paragraph"
        :image="homePageContent.Image"
        :reverse="true"
    />
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>

  <Presentation
      v-if="homePageContent2"
      :title="currentLang === 'it' ? homePageContent2.Title_it : homePageContent2.Title"
      :paragraphs="currentLang === 'it' ? homePageContent2.Paragraph_it : homePageContent2.Paragraph"
      :reverse="false"
      :calendar="true"
  />
  <div v-else>
    <p>Loading...</p>
  </div>

  <div :class="$style.packetsTitle">
    <h2>🎁 Our Packages</h2>
  </div>

  <div :class="$style.courseGrid">
    <Packet
        v-for="packet in packets"
        :id="packet.id"
        :price="packet.price"
        :duration="packet.duration"
        :color="packet.color"
    />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import Presentation from '~/components/presentation.vue'
import Packet from '../components/packet.vue'

const supabase = useSupabaseClient()
const { currentLang } = useLanguage()

const images = ref<Array<{ Title: string; ImageUrl: string; Course_Id: number }>>([])
const homePageContent = ref<any>(null)
const homePageContent2 = ref<any>(null)

const fetchImages = async () => {
  const { data, error } = await supabase.from('Slideshow').select('Title, ImageUrl,Course_Id')
  if (error) console.error('Errore slideshow:', error)
  images.value = data ?? []
}

const fetchPresentationContent = async () => {
  const { data: data1, error: err1 } = await supabase
      .from('Presentation')
      .select('*')
      .eq('Id', 4)
      .single()

  const { data: data2, error: err2 } = await supabase
      .from('Presentation')
      .select('*')
      .eq('Id', 5)
      .single()

  if (err1 || err2) {
    console.error('Error presentation:', err1 ?? err2)
    return
  }

  homePageContent.value = data1
  homePageContent2.value = data2
}

onMounted(() => {
  fetchImages()
  fetchPresentationContent()
})

watch(currentLang, fetchPresentationContent)

const packets = ref<Array<{ id: string; price: string; duration: string; color: string }>>([])

const fetchPackets = async () => {
  const lang = currentLang.value

  const { data, error } = await supabase
      .from('Packets')
      .select('Id, Price, Duration, Duration_it, Color')

  if (!error && data) {
    console.log('🎯 PACKETS FETCHED:', data)

    packets.value = (data as Array<{
      Id: string
      Price: string
      Duration: string
      Duration_it: string
      Color: string
    }>).map(p => ({
      id: String(p.Id),
      price: p.Price,
      duration: lang === 'it' ? p.Duration_it : p.Duration,
      color: p.Color
    }))
  } else {
    console.error('⚠️ Supabase error:', error)
  }
}

watch(currentLang, fetchPackets, { immediate: true })
</script>


<style module>
.courseGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12vw, 1fr));
  gap: var(--gap);
  padding: var(--padding);
  place-items: center;
}
.packetsTitle {
  margin-top: 2vw;
  font-size: 5vw;
  font-weight: bold;
  font-family: 'Rounded Mplus 1c Bold', serif;
  color:#0769a2;
  text-align: center;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}

@media (max-width: 760px) {
  .courseGrid {
    grid-template-columns: repeat(auto-fit, minmax(40vw, 1fr));
  }
}
</style>
