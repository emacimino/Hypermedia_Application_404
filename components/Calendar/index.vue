<script setup lang="ts">

import dayjs from "dayjs"
import {defineAsyncComponent, ref, reactive} from "vue"
const Year = defineAsyncComponent(() => import("~/components/Calendar/Year.vue"))
const Month = defineAsyncComponent(() => import("~/components/Calendar/Month.vue"))
const Dates = defineAsyncComponent(() => import("~/components/Calendar/Dates.vue"))
const selectedValues = reactive({
  month: dayjs().month(),
  year: dayjs().year(),
    }
)

function changeMonth(v: number) {
  selectedValues.month.value = v
}

function changeYear(v: number){
  selectedValues.year.value = v
}

const selectedDataValue = ref(dayjs().date())
</script>

<template>
  <div class="flex space-x-5 w-full" >
    <div class="flex flex-col">
      <Year @selected="changeYear"/>
      <Month @selected="changeMonth"/>
      <Dates :selectedValues="selectedValues" :selectedDate="selectedDate" />
    </div>
  </div>
  <div class="w=1/2">
    <span v-if="selectedDataValue">
      You have selected <br/>
      {{selectedDataValue}}
    </span>
  </div>
</template>

<style scoped>

</style>