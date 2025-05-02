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
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: #1F3A5F;
  font-size: 28px;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  line-height: 50px;
  word-wrap: break-word;
  text-align: center;
  text-decoration: none;
}

.menu-item:hover {
  text-decoration: underline;
}

.menu-item.large {
  width: 200px;
}
</style>