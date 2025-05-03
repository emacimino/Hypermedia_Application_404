<template>
  <div :class="$style.barraHome">
    <ClickableImage to="/" src="Logo.png" title="Vai alla home" />

    <MenuItem label="Activities" to="/activityPage"/>
    <MenuItem label="Teachers" to="/teachers"/>
    <MenuItem label="Highlights" to="/highlights"/>
    <MenuItem label="About us" to="/aboutUs"/>
    <MenuItem label="Contacts" to="/contacts"/>


    <img :class="$style.landmarkFlagIcon" alt="" src="assets/LanguageEN.png" />
  </div>
</template>
<script setup lang="ts">


import ClickableImage from "~/components/clickableImage.vue";

function onActivitiesContainerClick() {
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
  gap: 4%;
}
.landmarkFlagIcon {
  width: 4.5%;
  position: relative;
  object-fit: cover;
}
.barraHome * {
  border: 1px dashed red;
}
</style>