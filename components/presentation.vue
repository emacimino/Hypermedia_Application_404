<template>
  <div :class="[$style.property1default, reverse ? $style.reversed : '']">

    <div :class="$style.imageWrapper">
      <img :class="$style.image" :src="image" alt="image"/>
    </div>
    
    <div :class="$style.textContainer">
      <b :class="$style.title">{{ title }}</b>
      <div :class="$style.paragraphs">
        <p>{{ paragraphs }}</p>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  paragraphs: string
  image: string
  reverse?: boolean
}>()
</script>

<style module>
.property1default {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 48px 60px;
  gap: 60px;
  box-sizing: border-box;
  width: 100%;
  font-family: Inter;
}
.reversed {
  flex-direction: row-reverse;
}
.imageWrapper {
  flex: 1;
  max-width: 40%;
  min-width: 30%;
}
.image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
}
.textContainer {
  flex: 1;
  max-width: 50%;
  min-width: 300px;
}
.title {
  font-size: 3rem;
}
.paragraphs {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
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
