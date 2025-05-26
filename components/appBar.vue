<!-- /components/AppNavbar.vue -->
<template>
  <!-- ***** DESKTOP NAVBAR ************************************************ -->
  <nav
      class="hidden md:flex w-full items-center justify-between bg-blue-100 px-6 py-4"
  >
    <ClickableImage to="/" src="Logo.png" title="Go to home" />
    <div class="flex items-center gap-6">


      <MenuItem label="Activities" to="/activityPage" />
      <MenuItem label="Teachers"   to="/teacherPage"  />
      <MenuItem label="Highlights" to="/highlights"    />
      <MenuItem label="About us"   to="/aboutUs"       />
      <MenuItem label="Contacts"   to="/contacts"      />
    </div>

    <img
        class="w-8 h-8 object-cover"
        src="public/LanguageEN.png"
        alt="Language icon"
    />
  </nav>

  <!-- ***** MOBILE TOP BAR ************************************************ -->
  <nav
      class="flex md:hidden w-full items-center justify-between bg-blue-100 px-4 py-3"
  >
    <ClickableImage to="/" src="Logo.png" title="Go to home" />

    <!-- HAMBURGER -->
    <button
        type="button"
        @click="toggleMenu"
        class="relative z-50 flex flex-col justify-between w-8 h-6 cursor-pointer focus:outline-none"
        aria-label="Toggle navigation"
        :aria-expanded="isMenuOpen.toString()"
    >
      <!-- line 1 -->
      <span
          :class="[
          'block h-0.5 w-full bg-gray-800 transition-transform duration-300',
          isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
        ]"
      />
      <!-- line 2 -->
      <span
          :class="[
          'block h-0.5 w-full bg-gray-800 transition-opacity  duration-300',
          isMenuOpen ? 'opacity-0' : 'opacity-100'
        ]"
      />
      <!-- line 3 -->
      <span
          :class="[
          'block h-0.5 w-full bg-gray-800 transition-transform duration-300',
          isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
        ]"
      />
    </button>
  </nav>

  <!-- ***** MOBILE OVERLAY MENU ******************************************* -->
  <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white transition-opacity duration-300"
  >
    <MenuItem
        v-for="item in items"
        :key="item.to"
        :label="item.label"
        :to="item.to"
        class="text-2xl font-medium hover:underline"
        @click="closeMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuItem        from '~/components/menu_item.vue';
import ClickableImage  from '~/components/clickableImage.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const items = [
  { label: 'Activities', to: '/activityPage' },
  { label: 'Teachers',   to: '/teacherPage'     },
  { label: 'highlights', to: '/highlights'   },
  { label: 'About us',   to: '/aboutUs'      },
  { label: 'Contacts',   to: '/contacts'     }
];
</script>