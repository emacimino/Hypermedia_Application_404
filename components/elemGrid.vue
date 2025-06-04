<template>
  <div :class="$style.courseGrid">
    <singleActivityCard
        v-for="(card, index) in props.cards"
        :key="index"
        :Id="card.Id"
        :Title="card.Title"
        :ShortDescription="card.ShortDescription"
        :Image="card.Image"
    />
  </div>
</template>

<script setup lang="ts">
interface Cards {
  Id: number;
  Title: string;
  ShortDescription: string;
  Image: string;
}

const props = defineProps<{
  cards: Cards[];
}>();
</script>


<style module>
.courseGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--gap);
  padding: var(--padding);
}
.card img {
  width: 100%;
  height: var(--img-height);
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

/*.courseGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
  gap: 2.5vw;
  padding: 1.5vw;
}


@media (max-width: 760px) {
  .courseGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(45vw, 1fr));
    gap: 3vw;
    padding: 2vw;
    place-items: center;
  }
}*/
</style>