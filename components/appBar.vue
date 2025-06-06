<template>
  <!-- DESKTOP NAVIGATION -->
  <nav
      class="hidden md:flex w-full items-center justify-between bg-blue-100 rounded-md"
      style="padding: 0 2.75vw"
  >
<NuxtLink to="/"  class="flex items-center gap-[1vw] transition-transform duration-200 ease-in-out hover:scale-115 group cursor-pointer active:scale-115 group "
>
  <NuxtImg src="Logo2.png" title="Go to home" class="w-[6vw] min-w-[2rem] max-w-[6rem]" />
  <h2 class="text-[2.8vw] font-playfair font-semibold text-[#1F3A5F] whitespace-nowrap">
    White Lotus
  </h2>
</NuxtLink>

    <div class="flex items-center" style="gap: 2vw">
      <MenuItem
          v-for="item in items"
          :key="item.to"
          :label="item.label"
          :to="item.to"
      />
    </div>

    <img
        class="object-cover cursor-pointer hover:scale-115 group active:scale-115 group"
        style="width: 5vw; height: 5vw; min-width: 32px; min-height: 32px"
        :src="currentLang === 'en' ? '/LanguageEN.png' : '/LanguageIT.png'"
        alt="Switch language"
        @click="toggleLanguage"
    />
  </nav>

  <!-- MOBILE NAVIGATION -->
  <nav
      class="flex md:hidden w-full items-center justify-between bg-blue-100"
      style=" padding: 1vw 4vw"
  >
    <NuxtLink to="/"  alt="White lotus" class="flex items-center gap-[1vw] transition-transform duration-200 ease-in-out hover:scale-105 group cursor-pointer"
    >
      <NuxtImg  src="Logo2.png" title="Go to home" class="w-[6vw] min-w-[40px] max-w-[80px]" />
      <h2 class="text-[6vw] font-playfair font-semibold text-[#1F3A5F] whitespace-nowrap">
        White Lotus
      </h2>
    </NuxtLink>
    <!-- HAMBURGER BUTTON -->
    <button
        type="button"
        @click="toggleMenu"
        class="relative z-50 flex flex-col justify-between cursor-pointer focus:outline-none"
        style="width: 8vw; height: 6vw; min-width: 32px; min-height: 24px"
        aria-label="Toggle navigation"
        :aria-expanded="isMenuOpen.toString()"
    >
      <!-- Line 1 -->
      <span
          :class="[
          'block w-full bg-gray-800 transition-transform duration-300',
          isMenuOpen ? 'translate-y-[1.4vw] rotate-45' : '',
        ]"
          style="height: 0.4vw; min-height: 2px"
      />
      <!-- Line 2 -->
      <span
          :class="[
          'block w-full bg-gray-800 transition-opacity duration-300',
          isMenuOpen ? 'opacity-0' : 'opacity-100',
        ]"
          style="height: 0.4vw; min-height: 2px"
      />
      <!-- Line 3 -->
      <span
          :class="[
          'block w-full bg-gray-800 transition-transform duration-300',
          isMenuOpen ? '-translate-y-[1.4vw] -rotate-45' : '',
        ]"
          style="height: 0.4vw; min-height: 2px"
      />
    </button>
  </nav>

  <!-- MOBILE MENU OVERLAY -->
  <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 transition-opacity duration-300 bg-blue-100"
  >
    <MenuItem
        v-for="item in items"
        :key="item.to"
        :label="item.label"
        :to="item.to"
        class="text-[5vw] font-medium hover:underline text-center"
        @click="closeMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import MenuItem from '~/components/menu_item.vue';
import { useLanguage } from '~/composables/useLanguage';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const { toggleLanguage, currentLang, t } = useLanguage()

const items = computed(() => [
  { label: t.value.activities, to: '/activityPage' },
  { label: t.value.teachers,   to: '/teacherPage' },
  { label: t.value.highlights, to: '/highlights' },
  { label: t.value.aboutUs,   to: '/aboutUs' },
  { label: t.value.contacts,   to: '/contacts' }
]);
</script>