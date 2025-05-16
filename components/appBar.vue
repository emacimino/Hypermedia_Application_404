<template>
  <div :class="$style.barraHome">
    <div :class="$style.left">
      <ClickableImage to="/" src="Logo.png" title="Vai alla home" />
    </div>

    <div :class="$style.center">
      <MenuItem label="Activities" to="/activityPage"/>
      <MenuItem label="Teachers" to="/teachers"/>
      <MenuItem label="Highlights" to="/highlights"/>
      <MenuItem label="About us" to="/aboutUs"/>
      <MenuItem label="Contacts" to="/contacts"/>
    </div>

    <div :class="$style.right">
      <img :class="$style.landmarkFlagIcon" alt="" src="assets/LanguageEN.png" />
    </div>
  </div>
</template>


<script setup lang="ts">
</script>

<style module>
.barraHome {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #d0f0fd;
  padding: 0 2%;
  box-sizing: border-box;
}
.left, .center, .right {
  display: flex;
  align-items: center;
}
.center {
  gap: 4%;
  flex-grow: 1;
  justify-content: center;
}
.landmarkFlagIcon {
  width: 80px;
  height: auto;
  object-fit: cover;
}
</style>
