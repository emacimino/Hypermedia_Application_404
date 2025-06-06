<script setup lang="ts">
import dayjs from "dayjs"
import {ref} from "vue"
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline"
const yearEmit = defineEmits<{(e: "selected", v: number):void}>()

const year = ref<number>(dayjs().year())

function modifyYear(v){
  year.value += v
  yearEmit("selected",year.value)
}
</script>

<template>
  <div class="bg-blue-400 p-[1vw] rounded-t-md grid place-items-center">
    <span class="flex items-center gap-[1.5vw] select-none text-gray-50 text-[clamp(16px,1.2vw,24px)]">
      <ChevronLeftIcon
          class="cursor-pointer text-gray-800 w-[2vw] h-[2vw] min-w-[20px] min-h-[20px] hover:scale-115 group active:scale-115 group hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)]"
          @click="() => modifyYear(-1)"
      />
      <span>{{ year }}</span>
      <ChevronRightIcon
          class="cursor-pointer text-gray-800 w-[2vw] h-[2vw] min-w-[20px] min-h-[20px] hover:scale-115 group active:scale-115 group hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)]"
          @click="() => modifyYear(1)"
      />
    </span>
  </div>
</template>


<style scoped>

</style>