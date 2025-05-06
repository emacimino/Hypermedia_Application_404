<template>
  <div :class="$style.gridContainer">
    <single-highlight-card
        v-for="(card, index) in cards"
        :key="index"
        v-bind="card"

    />
  </div>
</template>

<script setup>

import SingleActivityCard from "~/components/singleActivityCard.vue";

const cards = [
  {
    name:"workshops",
    activityImage: 'workshops.png',
    title: 'Craft it yourself!',
    buttonText: 'See our labs!'
  },
  {
    name:"seminars",
    activityImage: 'seminars.png',
    title: 'Try something new!',
    buttonText: 'Start now!'
  },
  {
    name:"mindfulness",
    activityImage: 'mindfulness.png',
    title: 'Find yourself!',
    buttonText: 'Go relax!'
  },
  {
    name:"pilates",
    activityImage: 'pilates.png',
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
</style>