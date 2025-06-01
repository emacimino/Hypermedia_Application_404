<template>
  <div :class="$style.packet" :style="{ borderColor: color }">
    <div :class="$style.top" :style="{ backgroundColor: color + '70' }">
      <div :class="$style.price">{{ price }}</div>
    </div>
    <div :class="$style.bottom">
      <div :class="$style.type">{{ type }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  price: string
  type: string
  color: string
}>()
</script>

<style module>
.packet {
  border: 2px solid;
  border-radius: 12px;
  width: 15rem;
  height: 9rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.packet:hover {
  transform: translateY(-0.30rem) scale(1.07);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}
.top {
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.price {
  font-size: 3rem;
  font-weight: bold;
  color: #1f3a5f;
}
.bottom {
  height: 40%;
  background-color: white;
}
.type {
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
}
</style>
