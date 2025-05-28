<script setup>
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Funzione `range` per generare i numeri da 1 a n
const range = (n) => Array.from({ length: n }, (_, i) => i + 1)
</script>

<template>
  <div class="mt-[15px] grid gap-[20px] select-none">
    <!-- Giorni della settimana -->
    <div class="grid grid-cols-7 justify-between items-center">
      <div
          v-for="(day, index) in DAYS"
          :key="index"
          :title="day"
          class="text-center font-bold"
      >
        {{ day[0] }}
      </div>
    </div>

    <!-- Giorni del mese -->
    <div class="grid grid-cols-7 justify-between items-center gap-y-[20px]">
      <div
          v-for="date in range(31)"
          :key="date"
          class="flex justify-center cursor-pointer"
      >
        <div
            class="w-[3rem] h-[3rem] text-center rounded-full flex items-center justify-center p-[15px] relative "
        >
          {{ date }}
        </div>
      </div>
    </div>
  </div>
</template>
