<script setup lang="ts">
import SingleActivityCard from "~/components/singleActivityCard.vue";
import Presentation from "~/components/presentation.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const address = route.params.address as string;

interface Activity {
  Title: string;
  Description: string;
  Image: string;
}

const props = defineProps<{
  activities: Activity[];
}>();
console.log('Activities:', props.activities);


function onClick(title: string) {
  console.log('Click sul bottone');
  router.push(`/${address}/${title}`);
}
</script>


<template>
  <div :class="$style.courseGrid">
    <singleActivityCard
        v-for="(activity, index) in props.activities"
        :key="index"
        :title="activity.Title"
        :description="activity.Description"
        :image="activity.Image"
        @click="() => onClick(activity.Title)"

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