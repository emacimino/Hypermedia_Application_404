<template>
  <div :class="$style.barraHome">
    <img :class="$style.image5Icon" alt="" src="assets/Logo.png" />

    <!-- Uso del componente MenuItem per ogni voce -->
    <MenuItem title="Activities" :onClick="onActivitiesContainerClick" />
    <MenuItem title="Teachers" :onClick="onActivitiesContainerClick"/>
    <MenuItem title="Highlights" :onClick="onActivitiesContainerClick"/>
    <MenuItem title="About us" :onClick="onActivitiesContainerClick" />

    <img :class="$style.landmarkFlagIcon" alt="" src="assets/LanguageEN.png" />
  </div>
</template>
<script setup lang="ts">


function onActivitiesContainerClick() {
  // Add your code here
}</script>
<style  module>
.image5Icon {
  width: 92px;
  position: relative;
  max-height: 100%;
  object-fit: cover;
}

.barraHome {
  width: 100%;
  position: relative;
  background-color: #d0f0fd;
  height: 93px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: left;
  font-size: 36px;
  color: #1f3a5f;
}

.landmarkFlagIcon {
  width: 139px;
  position: relative;
  max-height: 100%;
  object-fit: cover;
}

</style>