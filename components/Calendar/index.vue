<script setup lang="ts">
import dayjs from "dayjs"
import { defineAsyncComponent, ref, reactive, computed, watch } from "vue"
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)
const Year = defineAsyncComponent(() => import("~/components/Calendar/Year.vue"))
const Month = defineAsyncComponent(() => import("~/components/Calendar/Month.vue"))
const Dates = defineAsyncComponent(() => import("~/components/Calendar/Dates.vue"))

const currentDate = ref(dayjs())
const showCalendar = ref(false)
// Reactive values
const selectedValues = reactive({
  month: dayjs().month(),
  year: dayjs().year()
})

const selectedDateValue = ref<number | null>(null)

const selectedFullDate = computed(() => {
  if (selectedDateValue.value === null) return null
  return dayjs()
      .year(selectedValues.year)
      .month(selectedValues.month)
      .date(selectedDateValue.value)
})

const selectedWeekdayIndex = computed(() => {
  if (!selectedFullDate.value) return null
  return (selectedFullDate.value.day() + 6) % 7 // Lunedì = 0
})
const activeDate = computed(() =>
    selectedFullDate.value ?? currentDate.value
)
function goToPreviousWeek() {
  currentDate.value = currentDate.value.subtract(1, 'week')
  updateWeekData()
}

function goToNextWeek() {
  currentDate.value = currentDate.value.add(1, 'week')
  updateWeekData()
}

function resetToCalendar() {
  showCalendar.value = true
  selectedDateValue.value = null
}
// Supabase client
const supabase = useSupabaseClient()

// Events
const weeklyEvents = ref<any[]>([])

const dayEvents = computed(() => {
  if (!selectedFullDate.value) return []
  const dateStr = selectedFullDate.value.format("YYYY-MM-DD")
  const weekdayStr = selectedFullDate.value.format("dddd")

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

function updateWeekData() {
  selectedDateValue.value = null
  selectedValues.year = currentDate.value.year()
  selectedValues.month = currentDate.value.month()
  fetchWeeklyEvents()
}

watch(selectedDateValue, () => {
  if (selectedDateValue.value !== null) {
    fetchWeeklyEvents()
  }
})

onMounted(() => {
  fetchWeeklyEvents()
})
</script>

<template>
  <div v-if="selectedDateValue !== null" class="mt-8">
    <!-- Griglia giorni della settimana -->
    <div class="flex justify-between items-center my-4">
      <button @click="goToPreviousWeek" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">← Settimana precedente</button>
      <span class="font-semibold">
    Settimana di {{ currentDate.format("DD MMM YYYY") }}
  </span>
      <button @click="goToNextWeek" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Settimana successiva →</button>
    </div>
    <button @click="resetToCalendar" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Torna al calendario
    </button>
    <div class="grid grid-cols-7 gap-4 text-center mb-6">
      <button
          v-for="(day, index) in ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']"
          :key="index"
          @click="selectedDateValue = currentDate.startOf('isoWeek').add(index, 'day').date()"
          :class="[
      'py-2 rounded font-semibold',
      index === selectedWeekdayIndex ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
    ]"
      >
        {{ day }}
      </button>
    </div>

    <!-- Eventi del giorno selezionato -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold">
        Eventi per il {{ selectedFullDate?.format("dddd DD MMMM") }}
      </h2>
      <div v-if="dayEvents.length === 0" class="text-gray-500 italic">Nessun evento.</div>

      <div v-for="event in dayEvents" :key="event.id" class="bg-white border rounded p-4 shadow">
        <div class="flex justify-between items-center">
          <h3 class="text-blue-700 font-semibold">{{ event.Title }}</h3>
          <span class="text-sm text-gray-600">{{ event.Time }}</span>
        </div>
        <p class="text-sm text-gray-700 mt-1">
          Corso: <strong>{{ event.Course_title }}</strong><br>
          Insegnante: <strong>{{ event.Teacher_name }}</strong>
        </p>
      </div>
    </div>
  </div>

  <!-- Calendario per selezionare data -->
  <div v-else>
    <div class="flex flex-col">
      <Year @selected="changeYear"/>
      <Month @selected="changeMonth"/>
      <Dates
          :selectedValues="selectedValues"
          :selectedDate="selectedDateValue"
          @selected="changeDate"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
