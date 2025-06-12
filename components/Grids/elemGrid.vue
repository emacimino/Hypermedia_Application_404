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
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: var(--gap);
  padding: var(--padding);
}


@media (max-width: 768px) {
  .courseGrid {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }
}

@media (min-width: 2560px) {
  .courseGrid {
    grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  }
}
</style>