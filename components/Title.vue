<template>
  <h1 :class="[$style.Title, showTitle ? $style.titleEnter : '']">
    {{ props.title }}
  </h1>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const showTitle = ref(false)

const props = defineProps<{
  title: string;
}>();

onMounted(() => {
  setTimeout(() => {
    showTitle.value = true
  }, 300)
})
</script>

<style module>
.Title {
  font-size: 4.5rem;
  padding: var(--padding);
  font-weight: bold;
  font-family: 'Rounded Mplus 1c Bold', serif;
  color:#0769a2;
  text-align: center;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}
@keyframes fadeSlideDown {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.titleEnter {
  animation: fadeSlideDown 0.8s ease-out forwards;
}
.Title:not(.titleEnter) {
  opacity: 0;
  transform: translateY(-30px);
}

@media (max-width: 768px) {
  .Title{
    font-size: 2rem;
  }
}

@media (min-width: 2560px) {
  .Title{
    font-size: 7.5rem;
  }
}
</style>