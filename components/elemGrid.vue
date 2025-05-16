<script setup lang="ts">
import SingleActivityCard from "~/components/singleActivityCard.vue";

interface Activity {
  Title: string;
  ShortDescription: string;
  Image: string;
}

const props = defineProps<{
  activities: Activity[];
}>();
console.log('Activities:', props.activities);
</script>


<template>
  <div :class="$style.courseGrid">
    <singleActivityCard
        v-for="(activity, index) in props.activities"
        :key="index"
        :title="activity.Title"
        :description="activity.ShortDescription"
        :image="activity.Image"
    />
  </div>
</template>

<style module>
@import "/assets/main.css";

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
</style>