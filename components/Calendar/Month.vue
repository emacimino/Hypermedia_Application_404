<script setup lang="ts">
import dayjs from "dayjs"
import {ref,computed} from "vue"
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline"
const monthEmit = defineEmits<{(e: "selected", v: number):void}>()
const month = ref<number>(dayjs().month())
const cMonth = computed(() => dayjs().month(month.value).format("MMMM"))

function modifyMonth(v){
  month.value += v
  monthEmit("selected",month.value)
}
</script>

<template>
  <div class="bg-blue-300 p-[1vw] grid place-items-center">
    <span class="flex items-center gap-[1.5vw] select-none text-gray-50 text-[clamp(16px,1.2vw,24px)]">
      <ChevronLeftIcon
          class="cursor-pointer text-gray-800 w-[2vw] h-[2vw] min-w-[20px] min-h-[20px]"
          @click="() => modifyMonth(-1)"
      />
      <span class=" w-[6vw] min-w-[64px]">
        {{ cMonth }}
      </span>
      <ChevronRightIcon
          class="cursor-pointer text-gray-800 w-[2vw] h-[2vw] min-w-[20px] min-h-[20px]"
          @click="() => modifyMonth(1)"
      />
    </span>
  </div>
</template>


<style scoped>

</style>