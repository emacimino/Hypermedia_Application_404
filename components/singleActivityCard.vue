<script setup>
defineProps({
  title: String,
  description: String,
  price: String,
  image: String
});
</script>

<template>
  <div :class="$style.yogaCours">
    <img :class="$style.imageIcon" :alt="title" :src="image" />
    <div :class="$style.copy">
      <div :class="$style.hathaYoga">{{ title }}</div>
      <div :class="$style.topic">{{ description }}</div>
      <div :class="$style.topic">{{ price }}</div>
    </div>
  </div>
</template>


<style  module>.image7Icon {
  width: 367px;
  position: relative;
  max-height: 100%;
  object-fit: cover;
}
.hathaYoga {
  align-self: stretch;
  position: relative;
  font-size: 24px;
  line-height: 150%;
  font-weight: 500;
}
.descriptionOfFifth {
  align-self: stretch;
  position: relative;
  line-height: 150%;
  font-weight: 500;
}
.copy {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}
.yogaCours {
  width: 20%;
  position: relative;
  height: 518px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  text-align: left;
  font-size: 20px;
  color: #1f3a5f;
  font-family: Inter;
}

</style>