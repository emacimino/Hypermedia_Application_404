<script setup>
import chev from '../assets/chev.svg'
</script>

<template>
  <div class="flex flex-col p-2 bg-antiquewhite rounded-t">
    <div class="info">
      <div class="year">
        <p>2023</p>
      </div>
    </div>

    <div class="flex justify-between items-center py-5">
      <!-- Chevron sinistra -->
      <div
          class="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer select-none transition-colors hover:bg-[#f3ce9e] rotate-180"
      >
        <img :src="chev" alt="left-chevron" class="w-full h-auto translate-x-[2px]" />
      </div>

      <!-- Mese -->
      <div class="text-center">
        <h2 class="text-[32px] font-extrabold tracking-[5.5px]">February</h2>
      </div>

      <!-- Chevron destra -->
      <div
          class="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer select-none transition-colors hover:bg-[#f3ce9e]"
      >
        <img :src="chev" alt="right-chevron" class="w-full h-auto translate-x-[2px]" />
      </div>
    </div>
  </div>
</template>
