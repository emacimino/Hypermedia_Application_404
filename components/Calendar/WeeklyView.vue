<script setup lang="ts">
import { CalendarIcon } from "@heroicons/vue/24/outline"
import dayjs from "dayjs"
import { ref, computed, onMounted, watch } from "vue"
import { useSupabaseClient } from "#imports"

const props = defineProps<{
  currentDate?: any
  activeDate?: any
  selectedWeekdayIndex?: number | null
  dayEvents?: any[] | null
}>()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'navigate', dir: 'prev' | 'next'): void
  (e: 'update:activeDate', v: any): void
  (e: 'update:selectedWeekdayIndex', v: number): void
  (e: 'day-click', v: any): void
}>()

const supabase = useSupabaseClient()

const internalDate = ref(props.currentDate ?? dayjs())
const internalEvents = ref<any[]>([])

const selectedLocalDate = ref((props.activeDate ?? internalDate.value).startOf('isoWeek'))
const selectedLocalIndex = ref(props.selectedWeekdayIndex ?? ((selectedLocalDate.value.day() + 6) % 7))

const internalActiveDate = computed(() => props.activeDate ?? selectedLocalDate.value)
const internalWeekdayIndex = computed(() => props.selectedWeekdayIndex ?? selectedLocalIndex.value)

const displayedEvents = computed(() => {
  const source = props.dayEvents ?? internalEvents.value
  const dateStr = internalActiveDate.value.format("YYYY-MM-DD")
  const weekdayStr = internalActiveDate.value.format("dddd")

  return source.filter(event =>
      (event.Type === 'onetime' && event.Date === dateStr) ||
      (event.Type === 'recurring' && event.Weekday === weekdayStr)
  )
})

function selectDay(index: number) {
  const selected = (props.currentDate ?? internalDate.value).startOf('isoWeek').add(index, 'day')
  if (props.activeDate) {
    emit('update:activeDate', selected)
  } else {
    selectedLocalDate.value = selected
  }

  if (props.selectedWeekdayIndex != null) {
    emit('update:selectedWeekdayIndex', index)
  } else {
    selectedLocalIndex.value = index
  }

  emit('day-click', selected)
}

function goToPreviousWeek() {
  if (props.currentDate) {
    emit('navigate', 'prev')
  } else {
    internalDate.value = internalDate.value.subtract(1, 'week')
    selectedLocalDate.value = internalDate.value.startOf('isoWeek')
    if (!props.dayEvents) fetchEvents()
  }
}

function goToNextWeek() {
  if (props.currentDate) {
    emit('navigate', 'next')
  } else {
    internalDate.value = internalDate.value.add(1, 'week')
    selectedLocalDate.value = internalDate.value.startOf('isoWeek')
    if (!props.dayEvents) fetchEvents()
  }
}

function resetToCalendar() {
  emit('back')
}

async function fetchEvents() {
  const base = internalDate.value
  const start = base.startOf('isoWeek').format("YYYY-MM-DD")
  const end = base.endOf('isoWeek').format("YYYY-MM-DD")

  const { data: onetimeEvents } = await supabase
      .from("events")
      .select("*")
      .eq("Type", "onetime")
      .gte("Date", start)
      .lte("Date", end)

  const { data: recurringEvents } = await supabase
      .from("events")
      .select("*")
      .eq("Type", "recurring")
      .in("Weekday", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])

  internalEvents.value = [...(onetimeEvents ?? []), ...(recurringEvents ?? [])]
}

// Solo se dayEvents non è fornito
onMounted(() => {
  if (!props.dayEvents) fetchEvents()
})

watch(() => internalDate.value.format("YYYY-MM-DD"), () => {
  if (!props.dayEvents) fetchEvents()
})
watch(() => selectedLocalDate.value.format("YYYY-MM-DD"), () => {
  if (!props.dayEvents) fetchEvents()
})

</script>

<template>
  <!-- Navigazione -->
  <div class="flex justify-between items-center my-4">
    <button @click="goToPreviousWeek" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
      ← Settimana precedente
    </button>
    <span class="font-semibold">
      {{ (props.currentDate ?? internalDate).format("DD MMM YYYY") }} week
      <button @click="resetToCalendar" class="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        <CalendarIcon class="h-5 w-5 inline" />
      </button>
    </span>
    <button @click="goToNextWeek" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
      Settimana successiva →
    </button>
  </div>

  <!-- Giorni della settimana -->
  <div class="grid grid-cols-7 gap-4 text-center mb-6">
    <button
        v-for="(day, index) in ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']"
        :key="index"
        @click="selectDay(index)"
        :class="[
        'py-2 rounded font-semibold w-full',
        index === internalWeekdayIndex ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
      ]"
    >
      {{ day }}
    </button>
  </div>

  <!-- Eventi -->
  <div class="space-y-4">
    <p>{{ paragraphs }}</p>

    <h2 class="text-lg font-semibold">
      Events for {{ internalActiveDate.format("dddd DD MMMM") }}
    </h2>
    <div v-if="displayedEvents.length === 0" class="text-gray-500 italic">Nessun evento.</div>

    <div
        v-for="event in displayedEvents"
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
</template>
