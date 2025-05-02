<template>
  <header>
    <appBar/>
  </header>
  <NuxtPage />
  <footer>
    <Footer/>
  </footer>
</template>
<script setup lang="ts">
import AppBar from "~/components/appBar.vue";
import Footer from "~/components/Footer.vue";
</script>