<template>

  <h1 :class="$style.Title">{{ title }}</h1>

  <div :class="$style.gridContainer">
    <single-highlight-card
        v-for="(card, index) in cards"
        :key="index"
        v-bind="card"

    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'

type Presentation = {
  Title: string
  Title_it: string
}

const supabase = useSupabaseClient()
const { currentLang } = useLanguage()

const title = ref('')

const fetchTitle = async () => {
  const { data, error } = await supabase
      .from('Presentation')
      .select('Title, Title_it')
      .eq('Id', 14)
      .single<Presentation>() // 👈 Add the generic type here

  if (error || !data) {
    console.error('Error fetching title:', error?.message)
    return
  }

  title.value = currentLang.value === 'it'
      ? data.Title_it ?? data.Title
      : data.Title ?? data.Title_it
}

// Fetch immediately and on language change
watch(currentLang, fetchTitle, { immediate: true })

const cards = [
  {
    name:"Workshops",
    title: 'Craft it yourself!',
    buttonText: 'See our labs!'
  },
  {
    name:"Seminars",
    title: 'Try something new!',
    buttonText: 'Start now!'
  },
  {
    name:"Mindfulness",
    title: 'Find yourself!',
    buttonText: 'Go relax!'
  },
  {
    name:"Pilates",
    title: 'Open your horizons!',
    buttonText: 'Start practising!'
  }

]
</script>

<style module>
.gridContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  padding: 32px;
}
.Title {
  font-size: 5vw;
  padding: 2vw;
  font-weight: bold;
  font-family: 'Rounded Mplus 1c Bold', serif;
  color:#0769a2;
  text-align: center;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}
</style>