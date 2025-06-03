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
</style>