<template>
  <div :class="$style.barraFooter">
    <div :class="$style.whiteLotusCenter">White Lotus Center</div>
    <div :class="$style.socialIcon">
      <Icon name="mdi:facebook" size="2vw" />
      <Icon name="mdi:instagram" size="2vw" />
      <Icon name="mdi:youtube" size="2vw" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style module>
.barraFooter {
  width: 100%;
  height: 100px;
  background-color: #d0f0fd;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 5vw;
  box-sizing: border-box;
}
.whiteLotusCenter {
  font-size: 2vw;
  line-height: 150%;
  color: #1f3a5f;
  margin-bottom: 12px;
}
.socialIcon {
  display: flex;
  gap: 16px;
  color: #1f3a5f;
}
</style>
