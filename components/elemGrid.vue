<template>
  <div :class="$style.courseGrid">
    <singleActivityCard
        v-for="(activity, index) in props.activities"
        :key="index"
        :Id="activity.Id"
        :Title="activity.Title"
        :ShortDescription="activity.ShortDescription"
        :Image="activity.Image"
    />
  </div>
</template>

<script setup lang="ts">
interface Activity {
  Id: number;
  Title: string;
  ShortDescription: string;
  Image: string;
}

const props = defineProps<{
  activities: Activity[];
}>();
</script>


<style module>
/*@import "/assets/main.css";*/

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