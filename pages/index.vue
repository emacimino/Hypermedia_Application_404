<template>
  <flow-image :images="images" />

  <div v-if="homePageContent">
    <Presentation
        :title="currentLang === 'it' ? homePageContent.Title_it : homePageContent.Title"
        :paragraphs="currentLang === 'it' ? homePageContent.Paragraph_it : homePageContent.Paragraph"
        :image="homePageContent.Image"
        :reverse="true"
        class="px-app-padding"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>

  <div v-if="homePageContent2">
    <Presentation
        :title="currentLang === 'it' ? homePageContent2.Title_it : homePageContent2.Title"
        :paragraphs="currentLang === 'it' ? homePageContent2.Paragraph_it : homePageContent2.Paragraph"
        :reverse="false"
        :calendar="true"
        class="px-app-padding"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>

  <div class="w-full max-w-screen-xl mx-auto">

    <div class="grid grid-cols-auto-fit gap-8 p-8" style="grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));">
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

interface PresentationContent {
  Title: string
  Paragraph: string
  Paragraph_it: string
  Image: string
  Title_it: string
}

interface ImageEntry {
  Title: string
  ImageUrl: string
}

const images = ref<ImageEntry[]>([])
const homePageContent = ref<PresentationContent | null>(null)
const homePageContent2 = ref<PresentationContent | null>(null)

const fetchImages = async () => {
  const { data, error } = await supabase.from('Slideshow').select('Title, ImageUrl')
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
    console.error('Errore presentation:', err1 ?? err2)
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
</script>
