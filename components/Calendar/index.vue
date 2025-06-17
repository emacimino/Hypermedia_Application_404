<template>
  <div v-if="!showCalendar" class="mt-8">
    <WeeklyView
        :current-date="currentDate"
        v-model:active-date="selectedFullDate"
        :selected-weekday-index="selectedWeekdayIndex"
        :day-events="dayEvents"
        @back="resetToCalendar"
        @navigate="handleWeekNavigation"
        :visualizeButton="true"
    />
  </div>

  <div v-else>
    <div class="flex flex-col">
      <Year @selected="changeYear" />
      <Month @selected="changeMonth" />
      <Dates
          :selectedValues="selectedValues"
          :selectedDate="selectedDateValue"
          @selected="changeDate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
import { defineAsyncComponent, ref, reactive, computed, watch, onMounted } from "vue"
import isoWeek from 'dayjs/plugin/isoWeek'
import { useSupabaseClient } from "#imports"
import { useLanguage } from '@/composables/useLanguage'
import WeeklyView from "~/components/Calendar/WeeklyView.vue"
import { useAllEventsStore } from '~/stores/events/allEventStore'

const allEventsStore = useAllEventsStore()
dayjs.extend(isoWeek)
const { currentLang } = useLanguage()



const Year = defineAsyncComponent(() => import("~/components/Calendar/Year.vue"))
const Month = defineAsyncComponent(() => import("~/components/Calendar/Month.vue"))
const Dates = defineAsyncComponent(() => import("~/components/Calendar/Dates.vue"))

const supabase = useSupabaseClient()

const currentDate = ref(dayjs())
const showCalendar = ref(true)

const selectedValues = reactive({
  month: currentDate.value.month(),
  year: currentDate.value.year()
})

const selectedDateValue = ref<number | null>(null)
const selectedFullDate = ref(dayjs())


watch(selectedDateValue, () => {
  if (selectedDateValue.value !== null) {
    selectedFullDate.value = dayjs()
        .year(selectedValues.year)
        .month(selectedValues.month)
        .date(selectedDateValue.value)
  }
})

const activeDate = computed(() => selectedFullDate.value ?? currentDate.value)

const selectedWeekdayIndex = computed(() => {
  if (!activeDate.value) return null
  return (activeDate.value.day() + 6) % 7 // Monday = 0
})


const dayEvents = computed(() => {
  if (!activeDate.value) return []
  const dateStr = activeDate.value.format("YYYY-MM-DD")
  const weekdayStr = activeDate.value.format("dddd")

  return allEventsStore.weeklyEvents.filter(event => {
    const type = event.Type // always in English
    const weekday = event.Weekday // always in English
    return (type === 'onetime' && event.Date === dateStr) ||
        (type === 'recurring' && weekday === weekdayStr)
  })
})

function changeMonth(v: number) {
  selectedValues.month = v
}

function changeYear(v: number) {
  selectedValues.year = v
}

function changeDate(v: number) {
  selectedDateValue.value = v
  showCalendar.value = false
}

function resetToCalendar() {
  selectedDateValue.value = null
  showCalendar.value = true
}



function handleWeekNavigation(direction: 'prev' | 'next') {
  currentDate.value = currentDate.value.add(direction === 'next' ? 1 : -1, 'week')
  allEventsStore.fetchWeeklyEvents(currentDate.value,supabase)
}

onMounted(() => {
  allEventsStore.fetchWeeklyEvents(currentDate.value,supabase)
})

watch(selectedDateValue, () => {
  if (selectedDateValue.value !== null) {
    allEventsStore.fetchWeeklyEvents(currentDate.value,supabase)
  }
})
</script>
