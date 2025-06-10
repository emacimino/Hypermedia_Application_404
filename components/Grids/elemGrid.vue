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
import singleActivityCard from '~/components/Single_Elements/singleActivityCard.vue'
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
  grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
  gap: var(--gap);
  padding: var(--padding);
}


@media (max-width: 760px) {
  .courseGrid {
    grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
  }
}
</style>