<template>
  <div v-if="aboutUsContent">
    <Presentation
        :title="currentLang === 'it' ? aboutUsContent.Title_it : aboutUsContent.Title"
        :paragraphs="currentLang === 'it' ? aboutUsContent.Paragraph_it : aboutUsContent.Paragraph"
        :image="aboutUsContent.Image"
        :reverse="true"
    />
  </div>
  <div v-else>
    <p>Loading...</p>

  </div>
  <Timeline/>



</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import Presentation from '~/components/presentation.vue'
import Timeline from '~/components/timeline.vue'

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

interface PresentationContent {
  id: number
  Title: string
  Paragraph: string
  Image: string
  Title_it: string
  Paragraph_it: string
}

interface TimelineItem {
  date: string
  title: string
  description: string
  icon?: string
}

const { data: aboutUsContent } = await useAsyncData<PresentationContent | null>('aboutUs', async () => {
  const { data, error } = await supabase
      .from('Presentation')
      .select('*')
      .eq('Id', 3)
      .single()

  if (error) console.error('Errore Supabase:', error)
  return data
})

const items = ref<TimelineItem[]>([
  {
    date: '15 Mar 2025',
    title: 'Avvio del Progetto',
    description: 'Inizio del progetto con allineamento del team e definizione delle milestone.',
    icon: 'i-lucide-rocket'
  },
  {
    date: '22 Mar 2025',
    title: 'Fase di Design',
    description: 'Ricerca utenti e workshop di design. Creazione di wireframe e prototipi.',
    icon: 'i-lucide-palette'
  },
  {
    date: '29 Mar 2025',
    title: 'Sprint di Sviluppo',
    description: 'Sviluppo frontend e backend. Implementazione delle funzionalità core.',
    icon: 'i-lucide-code'
  },
  {
    date: '5 Apr 2025',
    title: 'Testing e Deployment',
    description: 'Test QA e ottimizzazione delle performance. Deployment in produzione.',
    icon: 'i-lucide-check-circle'
  }
])
</script>

<style module>

</style>
