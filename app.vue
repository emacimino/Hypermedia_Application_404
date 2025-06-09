<template>
  <UApp>
  <div class="layout">
    <header>
      <appBar />
    </header>
    <main class="content">
      <NuxtPage />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
  </UApp>
</template>

<script setup lang="ts">
import AppBar from "~/components/appBar.vue";
import Footer from "~/components/Footer.vue";
import { useLanguage } from '~/composables/useLanguage'
import { useHead } from '#imports'

const { currentLang } = useLanguage()

useHead(() => ({
  htmlAttrs: {
    lang: currentLang.value
  }
}))
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
}
</style>
