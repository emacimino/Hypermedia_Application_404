<template>
  <div :class="$style.packet" :style="{ borderColor: color }">
    <div :class="$style.top" :style="{ backgroundColor: color + '70' }">
      <div :class="$style.price">{{ price }}</div>
    </div>
    <div :class="$style.bottom">
      <div :class="$style.type">{{ duration }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  price: string
  duration: string
  color: string
}>()
</script>

<style module>
.packet {
  border: 0.15rem solid;
  border-radius: 12px;
  width: 10rem;
  height: 7rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
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


@media (max-width: 768px) {
  .packet {
    width: 9rem;
    height: 7rem;
  }
  .price {
    font-size: 2.75rem;
  }
  .type {
    font-size: 1.25rem;
  }
}

@media (min-width: 2560px) {
  .packet{
    width: 20rem;
    height: 14.5rem;
  }
  .price {
    font-size: 5.5rem;
  }
  .type {
    font-size: 3rem;
  }
}
</style>
