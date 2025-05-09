<script setup lang="ts">
defineProps<{
  price: string
  type: string
}>()
</script>

<template>
  <div :class="$style.packet">
    <div :class="$style.wrapper">
      <div :class="$style.div">{{ price }}</div>
    </div>
    <div :class="$style.type">
      <div :class="$style.tipoPacchetto">Tipo: {{ type }}</div>
    </div>
  </div>
</template>

<style module>

.tipoPacchetto {

  top: 0px;
  left: 0px;
  letter-spacing: -0.02em;
  font-weight: 500;
  display: inline-block;
  width: 384px;
  height: 77px;
}

.type {

  top: 141px;
  left: 0px;
  width: 384px;
  height: 77px;
  overflow: hidden;
}
.wrapper {

  top: 0px;
  left: 0px;
  background-color: #ffe5b4;
  width: 384px;
  height: 141px;
  overflow: hidden;
  font-size: 96px;
}
</style>