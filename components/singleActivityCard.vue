<template>
  <div :class="$style.yogaCours">
    <img :class="$style.imageIcon" :alt="title" :src="image" />
    <div :class="$style.text">
      <div :class="$style.title">{{ title }}</div>
      <div :class="$style.description">{{ description }}</div>
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
.yogaCours {
  position: relative;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.imageIcon {
  width: 100%;
  position: relative;
  object-fit: cover;
}
.title {
  align-self: stretch;
  position: relative;
  font-size: 25px;
  color: #1f3a5f;
  font-family: Inter;
}

.description {
  align-self: stretch;
  position: relative;
  font-size: 20px;
  color: #1f3a5f;
  font-family: Inter;
}
.text {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}

</style>