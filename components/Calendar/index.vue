<template>
  <!-- Vista settimanale -->
  <div v-if="!showCalendar" class="mt-8">
    <!-- Controlli di navigazione -->
    <div class="flex justify-between items-center my-4">
      <button @click="goToPreviousWeek" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">← Settimana precedente</button>
      <span class="font-semibold">
        {{ currentDate.format("DD MMM YYYY") }} week
        <button @click="resetToCalendar" class="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      <CalendarIcon class="h-6 w-6" />
    </button>
      </span>
      <button @click="goToNextWeek" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Settimana successiva →
      </button>
    </div>

    <!-- Torna al calendario -->


    <!-- Giorni della settimana -->
    <div class="grid grid-cols-7 gap-4 text-center mb-6">
      <button
          v-for="(day, index) in ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']"
          :key="index"
          @click="selectedDateValue = currentDate.startOf('isoWeek').add(index, 'day').date(); showCalendar = false"
          :class="[
          'py-2 rounded font-semibold',
          index === selectedWeekdayIndex ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
        ]"
      >
        {{ day }}
      </button>
    </div>

    <!-- Eventi del giorno -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold">
        Events for {{ activeDate.format("dddd DD MMMM") }}
      </h2>
      <div v-if="dayEvents.length === 0" class="text-gray-500 italic">Nessun evento.</div>

      <div
          v-for="event in dayEvents"
          :key="event.id"
          class="bg-white border rounded p-4 shadow"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-blue-700 font-semibold">{{ event.Title }}</h3>
          <span class="text-sm text-gray-600">{{ event.Time }}</span>
        </div>
        <p class="text-sm text-gray-700 mt-1">
          Corso: <strong>{{ event.Course_title }}</strong><br />
          Insegnante: <strong>{{ event.Teacher_name }}</strong>
        </p>
      </div>
    </div>
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
import { CalendarIcon } from '@heroicons/vue/24/outline'

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

const selectedFullDate = computed(() => {
  if (selectedDateValue.value === null) return null
  return dayjs()
      .year(selectedValues.year)
      .month(selectedValues.month)
      .date(selectedDateValue.value)
})

const activeDate = computed(() =>
    selectedFullDate.value ?? currentDate.value
)

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

function goToPreviousWeek() {
  currentDate.value = currentDate.value.subtract(1, 'week')
  showCalendar.value = false
  fetchWeeklyEvents()
}

function goToNextWeek() {
  currentDate.value = currentDate.value.add(1, 'week')
  showCalendar.value = false
  fetchWeeklyEvents()
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
      .from("events")
      .select("*")
      .eq("Type", "onetime")
      .gte("Date", from)
      .lte("Date", to)

  const { data: recurringEvents } = await supabase
      .from("events")
      .select("*")
      .eq("Type", "recurring")
      .in("Weekday", weekdays)

  weeklyEvents.value = [...(onetimeEvents ?? []), ...(recurringEvents ?? [])]
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

