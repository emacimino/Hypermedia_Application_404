<template>
  <nuxt-link :to="link" class="linkWrapper">
    <div :class="$style.card">
      <img :src="Image" :alt="currentLang === 'it' ? 'Insegnante '+ Title : 'Teacher ' + Title" :class="$style.image" />
      <div :class="$style.content">
        <h2 :class="$style.title">{{ Title }}</h2>
        <p :class="$style.description">{{ ShortDescription }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLanguage } from '~/composables/useLanguage'
const { currentLang } = useLanguage()
const props = defineProps<{
  Id: number;
  Title: string;
  ShortDescription: string;
  Image: string;
}>();

const { createActivityUrl, createTeacherUrl } = useActivityUrl();

const link = computed(() => {
  if (props.Id > 49) {
    return createTeacherUrl({
      Id: props.Id,
      Title: props.Title,
    });
  } else {
    return createActivityUrl({
      Id: props.Id,
      Title: props.Title,
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
  height: 20rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-0.30rem) scale(1.07);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}
.image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  object-position: top;

}
.content {
  padding: 1rem;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
.description {
  font-size: 1rem;
  color: #555;
}
:global(.linkWrapper) {
  text-decoration: none;
  color: inherit;
}

@media (max-width: 768px) {
  .card {
    height: 17rem;
  }
  .image {
    height: 10rem;
  }
  .title {
    font-size: 1rem;
  }
  .description {
    font-size: 0.8rem;
  }
}

@media (min-width: 2560px) {
  .card {
    height: 35rem;
  }
  .image {
    height: 22rem;
  }
  .title {
    font-size: 2.75rem;
  }
  .description {
    font-size: 2rem;
  }
}
</style>