<script setup lang="ts">
import {watch, onMounted, ref} from "vue"
import dayjs from "dayjs";
type SelectedValues = {
  year: Number,
  month: Number,
}

const dateProps = defineProps<{
  selectedValues: SelectedValues,
  selectedDate: number
}>()

const days= [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
]

//function generateDatesForThatMonth(m: dayjs().month(), y: dayjs().year())
</script>

<template>
<div class="w-full bg-gray-200 p-2 rounded-b-md">
  <div class=" grid grid-cols-7 place-items-center gap-x-2 gap-y-4" >
    <div v-for="day in days" :key="day">
      <span class="text-gray-500 font-semibold" >{{day.slice(0,3)}}</span>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>