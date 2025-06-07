<template>
  <!-- Vista settimanale -->
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

  <!-- Vista calendario -->
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
import WeeklyView from "~/components/Calendar/WeeklyView.vue"
//to update vercel
dayjs.extend(isoWeek)

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
  return (activeDate.value.day() + 6) % 7 // Lunedì = 0
})

const weeklyEvents = ref<any[]>([])

const dayEvents = computed(() => {
  if (!activeDate.value) return []
  const dateStr = activeDate.value.format("YYYY-MM-DD")
  const weekdayStr = activeDate.value.format("dddd")

  return weeklyEvents.value.filter(event => {
    return (event.Type === 'onetime' && event.Date === dateStr) ||
        (event.Type === 'recurring' && event.Weekday === weekdayStr)
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

async function fetchWeeklyEvents() {
  const base = currentDate.value
  const startOfWeek = base.startOf('isoWeek')
  const endOfWeek = base.endOf('isoWeek')
  const from = startOfWeek.format("YYYY-MM-DD")
  const to = endOfWeek.format("YYYY-MM-DD")
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const { data: onetimeEvents } = await supabase
      .from("Events")
      .select("*")
      .eq("Type", "onetime")
      .gte("Date", from)
      .lte("Date", to)

  const { data: recurringEvents } = await supabase
      .from("Events")
      .select("*")
      .eq("Type", "recurring")
      .in("Weekday", weekdays)

  weeklyEvents.value = [...(onetimeEvents ?? []), ...(recurringEvents ?? [])]
}

function handleWeekNavigation(direction: 'prev' | 'next') {
  currentDate.value = currentDate.value.add(direction === 'next' ? 1 : -1, 'week')
  fetchWeeklyEvents()
}

onMounted(() => {
  fetchWeeklyEvents()
})

watch(selectedDateValue, () => {
  if (selectedDateValue.value !== null) {
    fetchWeeklyEvents()
  }
})
</script>
