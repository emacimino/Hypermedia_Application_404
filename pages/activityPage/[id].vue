<template>
  <Presentation
      v-if="activity"
      :title="activity?.Title"
      :paragraphs="activity?.LongDescription"
      :image="activity?.Image"
      :reverse="true"
  />
  <Subscription />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAsyncData } from "#app";
import Subscription from "~/components/Activity_page_components/subscription.vue";

interface Activity {
  id: number;
  Title: string;
  LongDescription: string;
  Image: string;
}

const route = useRoute();
const supabase = useSupabaseClient();

const activityId = computed(() => Number(route.params.id));

const { data: activity } = await useAsyncData<Activity | null>(`activity-${activityId.value}`, async () => {
  if (isNaN(activityId.value)) return null;

  const { data, error } = await supabase
      .from("Activities")
      .select("*")
      .eq("id", activityId.value)
      .single();

  if (error) console.error("Errore caricamento attività:", error);
  return data;
});
console.log("route.params.id:", route.params.id);
console.log("activityId:", activityId.value);
</script>

<style scoped>

</style>