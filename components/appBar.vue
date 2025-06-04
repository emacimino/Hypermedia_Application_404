<template>
  <!-- DESKTOP NAVIGATION -->
  <nav
      class="hidden md:flex w-full items-center justify-between bg-blue-100 rounded-md"
      style="padding: 0.5vw 3vw"
  >
    <ClickableImage to="/" src="Logo.png" title="Go to home" />

    <div class="flex items-center" style="gap: 2vw">
      <MenuItem
          v-for="item in items"
          :key="item.to"
          :label="item.label"
          :to="item.to"
      />
    </div>

    <img
        class="object-cover cursor-pointer"
        style="width: 4vw; height: 4vw; min-width: 32px; min-height: 32px"
        :src="currentLang === 'en' ? '/LanguageEN.png' : '/LanguageIT.png'"
        alt="Switch language"
        @click="toggleLanguage"
    />
  </nav>

  <!-- MOBILE NAVIGATION -->
  <nav
      class="flex md:hidden w-full items-center justify-between"
      style="background-color: #d0f0fd; padding: 3vw 4vw"
  >
    <ClickableImage to="/" src="Logo.png" title="Go to home" />

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
      class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 transition-opacity duration-300"
      style="background-color: #d0f0fd"
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
import ClickableImage from '~/components/clickableImage.vue';
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