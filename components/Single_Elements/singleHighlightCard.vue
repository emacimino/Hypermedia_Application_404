<template>

  <div :class="$style.property1default">


    <img :class="$style.shapeIcon" alt="" src="/shape1.svg" />


    <img :class="$style.activityImage" alt="" :src="card.link" />


    <img :class="$style.shapeIcon1" alt="" src="/shape2.svg" />


    <b :class="$style.title">{{ resolvedTitle }}</b>

    <!-- Interactive button area with hover and click events -->
    <div :class="[$style.btn, hoverClass]"
         @mouseover="onHover"
         @mouseleave="onLeave"
         @click="onClick">

      <!-- Label inside the button -->
      <b :class="$style.details">{{ resolvedParagraph }}</b>

      <!-- Arrow icon inside the button -->
      <img :class="$style.arrow" alt="Arrow icon" src='/Arrow.svg' />
    </div>

  </div>
</template>



<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import { useRouter } from 'vue-router'
import type { HighlightItem } from '~/stores/highlights/highlightsStore'


const { currentLang } = useLanguage()


const router = useRouter()


const { card } = defineProps<{ card: HighlightItem }>()

// Reactive references for the translated title and paragraph
const resolvedTitle = ref('')
const resolvedParagraph = ref('')

// Reactively update the title and paragraph when language or card changes
watchEffect(() => {
  resolvedTitle.value = card.title[currentLang.value] ?? ''
  resolvedParagraph.value = card.subtitle[currentLang.value] ?? ''
})

// Handle click event to navigate to the activity detail page
function onClick() {
  router.push(`/activities/${card.id}`)
}

// Dynamic class binding for hover effects
const hoverClass = ref('')
const style = useCssModule()

// Apply effect when mouse arrives
function onHover() {
  hoverClass.value = style.hoverEffect
}

// Remove effect when mouse leaves
function onLeave() {
  hoverClass.value = ''
}
</script>



<style  module>
.property1default {
  position: relative;
  width: 100%;
  height: 32rem;
  background-color: #0769a2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.8rem;
  color: #ffe5b4;
  font-family: 'Rounded Mplus 1c Bold', serif;
  border-radius: 0.5rem;
}
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
.activityImage {
  position: relative;
  z-index: 1;
  width: 68.89%;
  height: 20rem;
  border-radius: 2%;
  object-fit: cover;
  margin-bottom: 2rem;
}
.title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  min-height: 2.5rem;
  height: 2.5rem;
  max-width: 100%;
  white-space: nowrap;
  gap: 0.5rem;
  transition: transform 0.2s ease;
  cursor: pointer;
}
.btn:hover {
  background-color: #0077B6;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid #ffe5b4;
}
.btn:hover .arrow {
  transform: translateX(0.7vw);
}
.details {
  font-size: 1.2rem;
}
.arrow {
  width: 1.8rem;
  transition: transform 0.3s ease;
}


@media (max-width: 768px) {
  .property1default{
    height: 20rem;
  }
  .activityImage{
    height: 11rem;
    margin-bottom: 0.75rem;
  }
  .title{
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
  .details{
    font-size: 01rem;
  }
  .arrow {
    width: 1rem;
  }
  .btn{
    height: 1.5rem;
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
  }
}

@media (min-width: 2560px) {
  .property1default{
    height: 55rem;
  }
  .activityImage{
    height: 35rem;
    margin-bottom: 4rem;
  }
  .title{
    font-size: 3.75rem;
    margin-bottom: 2rem;
  }
  .details{
    font-size: 2.5rem;
  }
  .arrow {
    width: 2.75rem;
  }
  .btn{
    height: 5rem;
    border-radius: 2rem;
    padding: 1rem 3rem;
  }
}
</style>