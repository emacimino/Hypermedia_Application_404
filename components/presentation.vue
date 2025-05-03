<template>
  <div :class="[$style.property1default, reverse ? $style.reversed : '']">
    <div :class="$style.imageWrapper">
      <img :class="$style.image" :src="image" alt="" />
    </div>
    <div :class="$style.textContainer">
      <b :class="$style.title">{{ title }}</b>
      <div :class="$style.paragraphs">
        <p v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  paragraphs: string[]
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
  color: #1f3a5f;
  flex-wrap: wrap;
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
  font-size: 48px;
  margin-bottom: 24px;
  display: block;
}
.paragraphs {
  font-size: 20px;
  line-height: 1.6;
  letter-spacing: -0.01em;
}
</style>
