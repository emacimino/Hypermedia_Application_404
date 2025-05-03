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
    image1: 'alba.png',
    image2: 'crossfit.png',
    shape1: 'shape1.svg',
    shape2: 'shape2.svg',
    title: 'Craft it yourself!',
    buttonText: 'See our labs'
  },
  {
    image1: 'alba.png',
    image2: 'crossfit.png.png',
    shape1: 'shape1.svg',
    shape2: 'shape1.svg',
    title: 'Make it yours',
    buttonText: 'Start now'
  },

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