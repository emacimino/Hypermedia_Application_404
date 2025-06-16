<template>
  <!-- DESKTOP NAVIGATION -->
  <nav
      class="hidden md:flex w-full items-center justify-between bg-blue-100 rounded-md min-h-[5vh] max-h-[10vh]"
      style="padding: 0 2vw"
  >
  <NuxtLink to="/" title="Go to home" alt="Website logo, go to home"
            class="flex items-center gap-[0.5vw] transition-transform duration-200 ease-in-out hover:scale-110 group cursor-pointer active:scale-110 group hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)]">
    <NuxtImg src="Logo2.png" alt="Website logo, go to home" class="w-[clamp(2rem,4.5vw,5rem)] h-auto" />
    <h1 class=" text-[clamp(2rem,4vw,3.5rem)] font-playfair font-semibold text-[#1F3A5F] whitespace-nowrap">
      White Lotus
    </h1>
</NuxtLink>

    <div class="flex items-center" style="gap: 2vw">
      <MenuItem
          v-for="item in items"
          :key="item.to"
          :label="item.label"
          :to="item.to"
      />
    </div>

    <NuxtImg
        class="object-cover cursor-pointer w-[clamp(2.5rem,5vw,7rem)] transition-transform duration-200 hover:scale-115 group active:scale-115 group min-w-[2rem] max-w-[5.5rem]"
        :src="currentLang === 'en' ? '/Eng_blue.png' : '/Ita_blue.png'"
        alt="Switch language"
        @click="toggleLanguage"
    />
  </nav>

  <!-- MOBILE NAVIGATION -->
  <nav
      class="flex md:hidden w-full items-center justify-between bg-blue-100 rounded-md min-h-[4vh] max-h-[8vh]"
      style=" padding: 1vw 2vw"
  >
    <NuxtLink to="/" title="Go to home" alt="Website logo, go to home"
              class="flex items-center gap-[1vw] transition-transform duration-200 ease-in-out cursor-pointer hover:scale-115 active:scale-115 hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)] group"
    >
      <NuxtImg  src="Logo2.png" alt="Website logo, go to home" title="Go to home" class="min-h-[3vh] max-h-[6vh] min-w-[2rem] max-w-[6rem]" />
      <h1 class="text-[clamp(1.8rem,3.6vw,3.5rem)] font-playfair font-semibold text-[#1F3A5F] whitespace-nowrap">
        White Lotus
      </h1>
    </NuxtLink>
    <!-- HAMBURGER BUTTON -->
    <button
        type="button"
        @click="toggleMenu"
        class="relative z-50 flex flex-col justify-between cursor-pointer focus:outline-none"
        style="width: 6vw; height: 4.5vw; min-width: 2rem; min-height: 1.5rem"
        aria-label="Toggle navigation"
        :aria-expanded="isMenuOpen"

    >
      <!-- Line 1 -->
      <span
          :class="[
          'block w-full bg-[#1F3A5F] transition-transform duration-300',
          isMenuOpen ? 'translate-y-[1.4vw] rotate-45' : '',
        ]"
          style="height: 0.6vw; min-height: 2px"
      />
      <!-- Line 2 -->
      <span
          :class="[
          'block w-full bg-[#1F3A5F] transition-opacity duration-300',
          isMenuOpen ? 'opacity-0' : 'opacity-100',
        ]"
          style="height: 0.6vw; min-height: 2px"
      />
      <!-- Line 3 -->
      <span
          :class="[
          'block w-full bg-[#1F3A5F] transition-transform duration-300',
          isMenuOpen ? '-translate-y-[1.4vw] -rotate-45' : '',
        ]"
          style="height: 0.6vw; min-height: 2px"
      />
    </button>
  </nav>

  <!-- MOBILE MENU OVERLAY -->
  <div
      v-if="isMenuOpen"
      ref="menuRef"
      class="fixed right-0 w-2/3 max-h-fit z-40 flex flex-col items-center justify-start gap-10 transition-opacity duration-300 bg-blue-100 p-2 rounded-s"
  >
    <MenuItem
        v-for="item in items"
        :key="item.to"
        :label="item.label"
        :to="item.to"
        class=" font-medium hover:underline text-center"
        @click="closeMenu"
    />
    <NuxtImg
        class="object-cover cursor-pointer hover:scale-115 group active:scale-115 group w-[clamp(3rem,15vw,6rem)] h-[clamp(3rem,15vw,6rem)]"
        :src="currentLang === 'en' ? '/Eng_blue.png' : '/Ita_blue.png'"
        alt="Switch language"
        @click="toggleLanguage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import MenuItem from '~/components/Single_Elements/menu_item.vue'

const isMenuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  console.log('Toggle menu', !isMenuOpen.value)

  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

import { watch } from 'vue'

watch(isMenuOpen, (newVal) => {
  console.log(`isMenuOpen changed:`, newVal)

  if (newVal) {
    window.addEventListener('scroll', closeMenu)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
  } else {
    window.removeEventListener('scroll', closeMenu)
    document.removeEventListener('mousedown', handleClickOutside)
    document.removeEventListener('touchstart', handleClickOutside)
  }
})


function handleClickOutside(event: MouseEvent | TouchEvent) {
  const target = event.target as HTMLElement

  if (!isMenuOpen.value) return

  setTimeout(() => {
    if (
        menuRef.value &&
        !menuRef.value.contains(target) &&
        !target.closest('button[aria-label="Toggle navigation"]')
    ) {
      closeMenu()
    }
  }, 0)
}

// Multilingua
const { toggleLanguage, currentLang, t } = useLanguage()

// Voci di menu
const items = computed(() => [
  { label: t.value.activities, to: '/activityPage' },
  { label: t.value.teachers,   to: '/teacherPage' },
  { label: t.value.highlights, to: '/highlights' },
  { label: t.value.aboutUs,    to: '/aboutUs' },
  { label: t.value.contacts,   to: '/contacts' }
])
</script>
