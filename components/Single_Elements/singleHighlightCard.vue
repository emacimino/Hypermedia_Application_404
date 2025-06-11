<template>
  <div :class="$style.property1default">
    <img :class="$style.shapeIcon" alt="" src="/shape1.svg" />
    <img :class="$style.activityImage" alt="" :src="card.link" />
    <img :class="$style.shapeIcon1" alt="" src="/shape2.svg" />

    <b :class="$style.craftItYourself">{{ resolvedTitle }}</b>

    <div :class="[$style.btn, hoverClass]"
         @mouseover="onHover"
         @mouseleave="onLeave"
         @click="onClick">
      <b :class="$style.details">{{ resolvedParagraph }}</b>
      <img :class="$style.arrow" alt="Arrow icon" src='/Arrow.svg' />
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
import { useLanguage } from '~/composables/useLanguage'
import { useRouter } from 'vue-router'

const { currentLang } = useLanguage()
const router = useRouter()

const { card } = defineProps<{ card: HighlightItem }>()

const resolvedTitle = ref('')
const resolvedParagraph = ref('')

watchEffect(() => {
  resolvedTitle.value = card.title[currentLang.value] ?? ''
  resolvedParagraph.value = card.subtitle[currentLang.value] ?? ''
})

function onClick() {
  router.push(`/activityPage/${card.id}`)
}

const activityImagePath = ref(card.image)
const hoverClass = ref('')
const style = useCssModule()

function onHover() {
  hoverClass.value = style.hoverEffect
}

function onLeave() {
  hoverClass.value = ''
}
</script>


<style  module>
.property1default {
  position: relative;
  width: 100%;
  height: 35vw;
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
  height: 20vw;
  border-radius: 2%;
  object-fit: cover;
  margin-bottom: 2vw;
}
.craftItYourself {
  min-height: 3.5vw;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5vw 1.5vw;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1vw;
  min-height: 2.5vw;
  height: 2.5vw;
  max-width: 100%;
  white-space: nowrap;
  gap: 0.5vw;
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
  font-size: 1.2vw;
  line-height: 1;
  white-space: nowrap;
  padding: 0;
  margin: 0;
}
.arrow {
  width: 1.8vw;
  transition: transform 0.3s ease;
}
.turnOffWhenSavingOut {
  position: absolute;
  top: -0.26%;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
}
.grad {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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


@media (max-width: 760px) {
  .property1default{
    height: 70vw;
  }
  .activityImage{
    height: 40vw;
  }
  .craftItYourself{
    font-size: 7vw;
    margin-bottom: 2vw;
  }
  .details{
    font-size: 5vw;
  }
  .arrow {
    width: 4vw;
  }
  .btn{
    height: 7vw;
    border-radius: 3vw;
    padding: 1vw 3vw;
  }
}
</style>