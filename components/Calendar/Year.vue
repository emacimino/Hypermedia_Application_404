<template>
  <div class="bg-blue-400 p-[1vw] rounded-t-md grid place-items-center">
    <span class="flex items-center gap-[1.5vw] select-none text-gray-50 text-[clamp(16px,1.2vw,24px)]">
      <!-- Button to go to previous month -->
      <button
           @click="() => modifyYear(-1)"
           aria-label="Mese precedente"
           class="cursor-pointer text-gray-800 w-[2vw] h-[2vw] min-w-[20px] min-h-[20px] hover:scale-115 active:scale-115 hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)]"
       >
  <ChevronLeftIcon aria-hidden="true" />
         </button>

      <span>{{ year }}</span>
      <!-- Button to go to the following month -->
      <button
          @click="() => modifyYear(1)"
          aria-label="Mese successivo"
          class="cursor-pointer text-gray-800 w-[2vw] h-[2vw] min-w-[20px] min-h-[20px] hover:scale-115 active:scale-115 hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)]"
      >
  <ChevronRightIcon aria-hidden="true" />
</button>
    </span>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
import { ref } from "vue"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline"

// Emits the updated year to the parent component
const yearEmit = defineEmits<{ (e: "selected", v: number): void }>()

// Initializes the year to the current year using dayjs
const year = ref<number>(dayjs().year())

// Function to increment or decrement the year and to send it to the parent
function modifyYear(v) {
  year.value += v
  yearEmit("selected", year.value)
}
</script>

<style scoped>

</style>