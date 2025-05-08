<script setup lang="ts">

import SingleActivityCard from "~/components/singleActivityCard.vue";
import Presentation from "~/components/presentation.vue";
import {useRoute} from "vue-router";
const router = useRouter();  // Access the current route

const props = defineProps<{
  activities: {
    title: string;
    description: string;
    image: string;
  }[];
}>();

function onClick(title) {
  console.log('Click sul bottone');
  router.push(`/activityPage/${title}`);
}
</script>

<template>
  <div :class="$style.courseGrid">
    <singleActivityCard
        v-for="(activity, index) in props.activities"
        :key="index"
        :title="activity.title"
        :description="activity.description"
        :image="activity.image"
        @click="() => onClick(activity.title)"

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

.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-0.25rem);
}

.card img {
  width: 100%;
  height: var(--img-height);
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: var(--font-title);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: var(--font-base);
  color: #555;
}
</style>