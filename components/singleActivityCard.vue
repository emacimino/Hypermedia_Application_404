<template>
  <nuxt-link :to="link" class="linkWrapper">
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
import { computed } from 'vue';

const props = defineProps<{
  Id: number;
  Title: string;
  Title_it: string;
  ShortDescription: string;
  ShortDescription_it: string;
  Image: string;
}>();

const { createActivityUrl, createTeacherUrl } = useActivityUrl();

const link = computed(() => {
  if (props.Id > 50) {
    // Per i teacher, usa il composable per creare URL con ID-nome
    return createTeacherUrl({
      Id: props.Id,
      Title: props.Title,
      Title_it: props.Title_it
    });
  } else {
    // Per le attività, usa il composable per creare URL con ID-titolo
    return createActivityUrl({
      Id: props.Id,
      Title: props.Title,
      Title_it: props.Title_it
    });
  }
});
</script>

<style module>
.card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-0.30rem) scale(1.07);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
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
:global(.linkWrapper) {
  text-decoration: none;
  color: inherit;
}
</style>