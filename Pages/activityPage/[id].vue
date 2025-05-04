<script setup lang="ts">
import Subscription from "~/components/Activity_page_components/subscription.vue";
import ActivityPagePresentation from "~/components/Activity_page_components/activityPagePresentation.vue";

const route = useRoute();

console.log(route.params.id);
</script>

<template>
  <activityPagePresentation></activityPagePresentation>
  <subscription> </subscription>
</template>

<style scoped>

</style>