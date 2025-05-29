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
