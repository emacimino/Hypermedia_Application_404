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
  width: 18rem;
  height: 13rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.packet:hover {
  transform: translateY(-0.30rem) scale(1.07);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}
.top {
  padding: 16px;
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
  height: 100%;
  background-color: #fff;
  padding: 12px 16px;
}
.type {
  font-size: 1.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
}
</style>
