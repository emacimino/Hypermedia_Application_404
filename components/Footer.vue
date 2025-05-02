<template>
  <div :class = "$style.barraFooter">
    <div :class = "$style.socialIcon">
      <Icon name="mdi:facebook" size="45" />
      <Icon name="mdi:instagram" size="45" />
      <Icon name="mdi:youtube" size="45" />
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style module>
.barraFooter {
  width: 100%;
  height: 100px;
  position: relative;
  background-color: #d0f0fd;
  display: flex;
}
.socialIcon {
  color: #1f3a5f;
}
</style>