<template>
  <div :class="$style.card" @click="$emit('click')">
    <img :src="image" :alt="title" :class="$style.image" />
    <div :class="$style.content">
      <h3 :class="$style.title">{{ title }}</h3>
      <p :class="$style.description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  image: String
});
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