
<template>
  <div class="bg-blue-300 p-[1vw] grid place-items-center">

    <!-- Horizontal layout for month navigation controls and current month display -->
    <span class="flex items-center gap-[1.5vw] select-none text-gray-50 text-[clamp(16px,1.2vw,24px)]">
      <!-- Previous month button -->
      <button
          @click="() => modifyMonth(-1)"
          :aria-label="currentLang === 'it' ? 'mese precedente' : 'previous month'"
          class="cursor-pointer text-gray-800 w-[2vw] h-[2vw] min-w-[20px] min-h-[20px] hover:scale-115 active:scale-115 hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)]"
      >
  <ChevronLeftIcon aria-hidden="true" />
</button>
      <span class="flex-1 text-center">
        {{ cMonth }}
      </span>
      <!-- Next month button -->
      <button
          @click="() => modifyMonth(1)"
          :aria-label="currentLang === 'it' ? 'mese successivo' : 'next month'"
          class="cursor-pointer text-gray-800 w-[2vw] h-[2vw] min-w-[20px] min-h-[20px] hover:scale-115 active:scale-115 hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)]"
      >
  <ChevronRightIcon aria-hidden="true" />
</button>
    </span>
  </div>
</template>


<script setup lang="ts">
import dayjs from "dayjs"
import { ref, computed } from "vue"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline"
import { useLanguage } from '@/composables/useLanguage'

// Used to notify when the selected month changes
const monthEmit = defineEmits<{ (e: "selected", v: number): void }>()

// Holds the current month index (0 = January, 11 = December)
const month = ref<number>(dayjs().month())


const { currentLang } = useLanguage()

// Compute the localized name of the current month
const cMonth = computed(() =>
    dayjs().locale(currentLang.value).month(month.value).format("MMMM")
)

// Function to increment or decrement the month
function modifyMonth(v: number) {
  month.value += v
  monthEmit("selected", month.value)
}
</script>



<style scoped>

</style>