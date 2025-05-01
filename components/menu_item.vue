<script setup lang="ts">
  defineProps<{
    label: string;
    to: string;
    large?: boolean
  }>()
</script>

<template>
<div class = "menu-item" :class="{ large }" @click = "handleClick">
  {{label}}
</div>
</template>

<style scoped>
.menu-item {
  width: 220px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: #1F3A5F;
  font-size: 36px;
  font-family: 'Playfair Display', serif;
  font-weight: 500;
  line-height: 54px;
  word-wrap: break-word;
  text-align: center;
  text-decoration: none;
}

.menu-item:hover {
  text-decoration: underline;
}

.menu-item.large {
  width: 230px;
}
</style>