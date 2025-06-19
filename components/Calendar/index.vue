<template>
  <!-- Show the weekly view when `showCalendar` is false -->
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

  <!-- Show the full calendar view when `showCalendar` is true -->
  <div v-else>
    <div class="flex flex-col">
      <Year @selected="changeYear" />
      <Month @selected="changeMonth" />
      <!-- Dates grid: displays selectable days for given month/year -->
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
import { useLanguage } from '@/composables/useLanguage'
import WeeklyView from "~/components/Calendar/WeeklyView.vue"
import { useAllEventsStore } from '~/stores/events/allEventStore'

// Access global store containing all event data
const allEventsStore = useAllEventsStore()

dayjs.extend(isoWeek)


const { currentLang } = useLanguage()

// load subcomponents used in calendar UI
const Year = defineAsyncComponent(() => import("~/components/Calendar/Year.vue"))
const Month = defineAsyncComponent(() => import("~/components/Calendar/Month.vue"))
const Dates = defineAsyncComponent(() => import("~/components/Calendar/Dates.vue"))


const currentDate = ref(dayjs())
const showCalendar = ref(true)

// Selected month/year values (used by Dates component)
const selectedValues = reactive({
  month: currentDate.value.month(),
  year: currentDate.value.year()
})

const selectedDateValue = ref<number | null>(null)
const selectedFullDate = ref(dayjs())

// Update selected full date when user chooses a new day
watch(selectedDateValue, () => {
  if (selectedDateValue.value !== null) {
    selectedFullDate.value = dayjs()
        .year(selectedValues.year)
        .month(selectedValues.month)
        .date(selectedDateValue.value)
  }
})

// Fallback to `currentDate` if no date is selected
const activeDate = computed(() => selectedFullDate.value ?? currentDate.value)

// Compute index of the selected weekday (0 = Monday, 6 = Sunday)
const selectedWeekdayIndex = computed(() => {
  if (!activeDate.value) return null
  return (activeDate.value.day() + 6) % 7
})

// Filter events for the active week/day
const dayEvents = computed(() => {
  if (!activeDate.value) return []

  const dateStr = activeDate.value.format("YYYY-MM-DD")
  const weekdayStr = activeDate.value.format("dddd") // Always in English

  // Return events that are either one-time on this exact date or recurring on the weekday
  return allEventsStore.weeklyEvents.filter(event => {
    const type = event.Type
    const weekday = event.Weekday
    return (type === 'onetime' && event.Date === dateStr) ||
        (type === 'recurring' && weekday === weekdayStr)
  })
})

// Handle selection of a new month
function changeMonth(v: number) {
  selectedValues.month = v
}

// Handle selection of a new year
function changeYear(v: number) {
  selectedValues.year = v
}

// Hide calendar and show weekly view
function changeDate(v: number) {
  selectedDateValue.value = v
  showCalendar.value = false
}

// Switch back from weekly view to calendar view
function resetToCalendar() {
  selectedDateValue.value = null
  showCalendar.value = true
}

// Navigate between weeks in the WeeklyView and fetch new event data
function handleWeekNavigation(direction: 'prev' | 'next') {
  currentDate.value = currentDate.value.add(direction === 'next' ? 1 : -1, 'week')
  allEventsStore.fetchWeeklyEvents(currentDate.value)
}

// Fetch events for the initial week when component mounts
onMounted(() => {
  allEventsStore.fetchWeeklyEvents(currentDate.value)
})

// Re-fetch events if the selected day changes from the calendar
watch(selectedDateValue, () => {
  if (selectedDateValue.value !== null) {
    allEventsStore.fetchWeeklyEvents(currentDate.value)
  }
})
</script>
