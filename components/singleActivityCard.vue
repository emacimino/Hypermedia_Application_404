<template>
  <nuxt-link :to="`/activityPage/${Id}`">
    <div :class="$style.card">
      <img :src="Image" :alt="Title" :class="$style.image" />
      <div :class="$style.content">
        <h3 :class="$style.title">{{ Title }}</h3>
        <p :class="$style.description">{{ ShortDescription }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps<{
  Id: number;
  Title: string;
  ShortDescription: string;
  Image: string;
}>();
</script>


<style  module>
.card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-0.25rem);
}
.image {
  width: 100%;
  height: var(--img-height);
  object-fit: cover;
}
.content {
  padding: 1rem;
}
.title {
  font-size: var(--font-title);
  font-weight: bold;
}
.description {
  font-size: var(--font-base);
  color: #555;
}

</style>