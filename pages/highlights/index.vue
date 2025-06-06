<template>

  <h1 :class="[$style.Title, showTitle ? $style.titleEnter : '']">
    {{ title }}
  </h1>

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
import { onMounted } from 'vue'

const showTitle = ref(false)

onMounted(() => {
  setTimeout(() => {
    showTitle.value = true
  }, 80)
})

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
  grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
  gap: var(--gap);
  padding: 0 var(--padding);
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


@keyframes fadeSlideDown {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.titleEnter {
  animation: fadeSlideDown 0.8s ease-out forwards;
}


@media (max-width: 760px) {
  .Title{
    font-size: 8vw;
  }
  .gridContainer{
    grid-template-columns: repeat(auto-fit, minmax(40vw, 1fr));
    padding: 0 15vw;
    margin-bottom: var(--gap);
  }
}
</style>