<template>
  <div v-if="activity">
    <Presentation
        :title="activity.Title"
        :paragraphs="activity.LongDescription"
        :image="activity.Image"
        :reverse="true"
    />
    <Subscription />
  </div>
</template>


<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAsyncData } from "#app";
import Subscription from "~/components/subscription.vue";

interface Activity {
  Id: number;
  Title: string;
  LongDescription: string;
  Image: string;
}

const route = useRoute();
const supabase = useSupabaseClient();

const activityId = computed(() => Number(route.params.id));

const { data: activity } = await useAsyncData<Activity | null>(`activity-${activityId.value}`, async () => {
  if (isNaN(activityId.value)) return null;

  const result = await supabase
      .from("Activities")
      .select("*")
      .eq("Id", activityId.value)
      .single();

  return result.data;
});
</script>

<style scoped>
</style>