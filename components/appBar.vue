<template>
  <div :class="$style.barraHome">
    <ClickableImage to="/" src="Logo.png" title="Vai alla home" />

    <!-- Uso del componente MenuItem per ogni voce -->
    <MenuItem label="Activities" to="/activityPage"  :large="true"/>
    <MenuItem label="Teachers" to="/teachers"  :large="true"/>
    <MenuItem label="Highlights" to="/highlights"  :large="true"/>
    <MenuItem label="About us" to="/aboutUs"  :large="true"/>

    <img :class="$style.landmarkFlagIcon" alt="" src="assets/LanguageEN.png" />
  </div>
</template>
<script setup lang="ts">


import ClickableImage from "~/components/clickableImage.vue";

function onActivitiesContainerClick() {
  // Add your code here
}</script>
<style  module>


.barraHome {
  width: 100%;
  position: relative;
  background-color: #d0f0fd;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2%;
  text-align: left;
}

.landmarkFlagIcon {
  width: 70px;
  position: relative;
  max-height: 100%;
  object-fit: cover;
}

</style>