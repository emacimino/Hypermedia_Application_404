<template>
  <div :class="$style.property1default">
    <img :class="$style.shapeIcon" alt="" src="/shape1.svg" />
    <img :class="$style.activityImage" alt="" :src="activityImage" />
    <img :class="$style.shapeIcon1" alt="" src="/shape2.svg" />

    <b :class="$style.craftItYourself">{{ resolvedTitle }}</b>

    <div :class="[$style.btn, hoverClass]"
         @mouseover="onHover"
         @mouseleave="onLeave"
         @click="onClick">
      <b :class="$style.details">{{ resolvedParagraph }}</b>
      <img :class="$style.arrow" alt="" src="/Arrow.svg" />
    </div>

    <div :class="$style.turnOffWhenSavingOut">
      <div :class="$style.grad" />
      <div :class="$style.pushingItSafeArea" />
      <div :class="$style.safeArea" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '@/composables/useLanguage'

const supabase = useSupabaseClient()
const { currentLang } = useLanguage()

const props = defineProps({
  name: String, // used as key for Supabase match
  activityImage: String,
  title: {
    type: String,
    default: 'Discover our activity!',
  },
  buttonText: {
    type: String,
    default: 'Go see it!',
  }
})

const resolvedTitle = ref(props.title)
const resolvedParagraph = ref(props.buttonText)

function getColumnName(base: string): string {
  return currentLang.value === 'it' ? `${base}_it` : base
}

watchEffect(async () => {
  const titleCol = getColumnName('Title')
  const paragraphCol = getColumnName('Paragraph')

  const { data, error } = await supabase
      .from('Presentation')
      .select(`${titleCol}, ${paragraphCol}`)
      .eq('Title', props.title)
      .single()

  if (!error && data) {
    resolvedTitle.value = data[titleCol]
    resolvedParagraph.value = data[paragraphCol]
  }
})

// Hover + click logic
const hoverClass = ref('')
const style = useCssModule()

function onHover() {
  hoverClass.value = style.hoverEffect
}

function onLeave() {
  hoverClass.value = ''
}

async function onClick() {
  const { data, error } = await supabase
      .from('Activities')
      .select('Id')
      .eq('Title', props.name)
      .single()

  if (error || !data) {
    console.error('Activity not found:', error)
    return
  }

  const activityId = data.Id
  navigateTo(`/activityPage/${activityId}`)
}
</script>


<style  module>
.property1default {
  position: relative;
  width: 100%;
  height: 45.57vw; /* 1739 / 1920 */
  background-color: #0769a2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 1.81vw;
  color: #ffe5b4;
  font-family: 'Rounded Mplus 1c Bold', serif;
  border-radius: 0.38vw;
}

/* SHAPE decorative dietro */
.shapeIcon {
  position: absolute;
  top: 1.15%;
  left: 46.02%;
  width: 69.53%;
  height: 48.61%;
  object-fit: contain;
  opacity: 0.3;
  z-index: 0;
}

.shapeIcon1 {
  position: absolute;
  top: 63.49%;
  left: -2.44%;
  width: 38.66%;
  height: 43.49%;
  object-fit: contain;
  opacity: 0.3;
  z-index: 0;
}

/* CONTENUTO principale centrato */
.activityImage {
  position: relative;
  z-index: 1;
  width: 68.89%;
  height: auto;
  border-radius: 2%;
  object-fit: cover;
  margin-bottom: 2vw;
}

.craftItYourself {
  min-height: 3.5vw; /* Ensures same height across all cards */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.8vw;
  margin-bottom: 1vw;
  padding: 0 1vw;
  line-height: 1.2;
  word-wrap: break-word;
}

.btn {
  display: inline-flex; /* let button size match content */
  align-items: center;
  justify-content: center;
  padding: 0.5vw 1.5vw; /* horizontal space around text */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1vw;
  min-height: 2.5vw;
  height: 2.5vw; /* fixed vertical height */
  max-width: 100%;
  white-space: nowrap; /* keep on one line */
  gap: 0.5vw;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.details {
  font-size: 1.2vw;
  line-height: 1;
  white-space: nowrap; /* prevent wrap */
  padding: 0;
  margin: 0;
}

.arrow {
  width: 1.8vw;
  transition: transform 0.3s ease;
}

/* HOVER EFFECT */
.btn:hover {
  background-color: #0077B6;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.btn:hover .arrow {
  transform: translateX(5px);
}

/* Sezioni non centrali (non toccate) */
.turnOffWhenSavingOut {
  position: absolute;
  top: -0.26%;
  left: 0px;
  width: 100%;
  height: 100%;
  display: none;
}

.grad {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0) 21.35%, rgba(0, 0, 0, 0) 86.41%, rgba(0, 0, 0, 0.15));
}

.pushingItSafeArea {
  position: absolute;
  height: 81.09%;
  width: 91.48%;
  top: 10.16%;
  right: 4.26%;
  bottom: 8.75%;
  left: 4.26%;
  background-color: rgba(87, 99, 242, 0.1);
  border: 0.19vw solid #404df2;
  box-sizing: border-box;
}

.safeArea {
  position: absolute;
  height: 74.17%;
  width: 82.78%;
  top: 12.81%;
  right: 8.61%;
  bottom: 13.02%;
  left: 8.61%;
  background-color: rgba(87, 99, 242, 0.1);
  border: 0.19vw solid #404df2;
  box-sizing: border-box;
}

</style>