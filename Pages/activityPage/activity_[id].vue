<script setup lang="ts">
const route = useRoute();

console.log(route.params.id);
</script>

<template>
  <div>activity id: {{$route.params.id}}</div>

</template>

<style scoped>

</style>