<template>
  <div :class="[$style.property_default, reverse ? $style.reversed : '']">

    <div v-if="image" :class="$style.imageWrapper">
      <img :class="$style.image" :src="image" :alt="title"/>
    </div>
    <Calendar v-else-if="calendar" :class="$style.calendar" />
    <div v-else>
      <p>No content available</p>
    </div>

    <div>
      <b :class="$style.title">{{ title }}</b>
      <div :class="$style.paragraphs">
        <p>{{ paragraphs }}</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from "vue"

const calendar = defineAsyncComponent(() => import("./Calendar/index.vue"))
defineProps<{
  title: string
  paragraphs: string
  image?: string
  reverse?: boolean
  calendar?: boolean
}>()
</script>

<style module>
.property_default {
  display: flex;
  flex-direction: row;
  padding: 48px 60px;
  gap: 60px;
  box-sizing: border-box;
  width: 100%;
  font-family: Inter;
  align-items: center;
}
.reversed {
  flex-direction: row-reverse;
}
.imageWrapper {
  flex: 1;
  min-width: 40%;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
.calendar {
  min-width: 40%;
}
.title {
  font-size: 3rem;
}
.paragraphs {
  font-size: 1.5rem;
}


@media (max-width: 768px) {
  .property_default {
    flex-direction: column;
    padding: 24px 20px;
    gap: 24px;
  }
  .imageWrapper,
  .textContainer {
    max-width: 100%;
    min-width: 0;
  }
  .title {
    font-size: 2rem;
  }
  .paragraphs {
    font-size: 1.2rem;
  }
}

@media (max-width: 1024px) {
  .property1default {
    flex-direction: column;
    padding: 24px 20px;
    gap: 24px;
  }
  .imageWrapper,
  .textContainer {
    max-width: 100%;
    min-width: 0;
  }
}
</style>
