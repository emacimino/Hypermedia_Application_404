<template>

  <h1 :class="$style.pageTitle">🔥 Highlights of the Week</h1>

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
.pageTitle {
  font-size: 6vw;
  font-weight: bold;
  font-family: 'Rounded Mplus 1c Bold', serif;
  color:#0769a2;
  text-align: center;
  margin-top: 3vw;
  margin-bottom: 2vw;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}
</style>