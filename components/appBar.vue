<template>
  <div :class="$style.barraHome">
    <div :class="$style.left">
      <ClickableImage to="/" src="Logo.png" title="Go to home" />
    </div>

    <div :class="$style.center">
      <MenuItem :label="t('activities')" to="/activityPage" />
      <MenuItem :label="t('teachers')" to="/teacherPage" />
      <MenuItem :label="t('highlights')" to="/highlights" />
      <MenuItem :label="t('aboutUs')" to="/aboutUs" />
      <MenuItem :label="t('contacts')" to="/contacts" />
    </div>

    <div :class="$style.right">
      <button @click="toggleLanguage" :class="$style.languageButton" title="Change language">
        <img :class="$style.landmarkFlagIcon" alt="Language" :src="getIcon(currentLang)" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'

const { currentLang, t, toggleLanguage } = useLanguage()

function getIcon(lang: string) {
  return lang === 'en' ? 'LanguageEN.png' : 'LanguageIT.png'
}
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
.left,
.center,
.right {
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
.languageButton {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
