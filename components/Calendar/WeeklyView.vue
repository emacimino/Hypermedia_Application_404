<script setup lang="ts">
import { CalendarIcon } from "@heroicons/vue/24/outline"
import dayjs from "dayjs"
import { ref, computed, onMounted, watch } from "vue"
import { useSupabaseClient } from "#imports"
import { useLanguage } from '@/composables/useLanguage'

const { currentLang } = useLanguage()

const getField = (entry: any, key: string) => {
  return currentLang.value === 'it' ? entry[`${key}_it`] ?? entry[key] : entry[key]
}

const props = defineProps<{
  currentDate?: any
  activeDate?: any
  selectedWeekdayIndex?: number | null
  dayEvents?: any[] | null
  visualizeButton?: boolean
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
  if (props.activeDate) emit('update:activeDate', selected)
  else selectedLocalDate.value = selected

  if (props.selectedWeekdayIndex != null) emit('update:selectedWeekdayIndex', index)
  else selectedLocalIndex.value = index

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
      .from("Events")
      .select("*")
      .eq("Type", "onetime")
      .gte("Date", start)
      .lte("Date", end)

  const { data: recurringEvents } = await supabase
      .from("Events")
      .select("*")
      .eq("Type", "recurring")
      .in("Weekday", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])

  internalEvents.value = [...(onetimeEvents ?? []), ...(recurringEvents ?? [])]
}

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
  <div class="flex justify-between items-center my-[2vw] px-[2vw]">
    <button @click="goToPreviousWeek" class="px-[2vw] py-[0.8vw] bg-gray-200 text-blue-500 rounded hover:bg-gray-300">
      ← Settimana precedente
    </button>

    <span class="font-semibold text-center">
      {{ (props.currentDate ?? internalDate).format("DD MMM YYYY") }} week
      <button v-if="visualizeButton" @click="resetToCalendar" class="ml-[1vw] px-[1.5vw] py-[0.8vw] bg-blue-300 text-white rounded hover:bg-blue-400">
        <CalendarIcon class="inline w-[1.8vw] h-[1.8vw]" />
      </button>
    </span>

    <button @click="goToNextWeek" class="px-[2vw] py-[0.8vw] text-blue-500 bg-gray-200 rounded hover:bg-gray-300">
      Settimana successiva →
    </button>
  </div>

  <div class="grid grid-cols-7 gap-[1vw] text-center mb-[2vw] px-[1vw]">
    <button
        v-for="(day, index) in ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']"
        :key="index"
        @click="selectDay(index)"
        :class="[
        'py-[1.2vw] rounded font-semibold w-full transition-transform',
        'hover:scale-105 hover:bg-blue-300 active:scale-105 active:bg-blue-300',
        index === internalWeekdayIndex ? 'bg-blue-300 text-white' : 'bg-gray-100 text-blue-500'
      ]"
    >
      {{ day }}
    </button>
  </div>

  <div class="space-y-[2vw] px-[2vw]">
    <h2 class="text-lg font-semibold">
      Events for {{ internalActiveDate.format("dddd DD MMMM") }}
    </h2>

    <div v-if="displayedEvents.length === 0" class="text-blue-500 italic">
      Nessun evento.
    </div>

    <div
        v-for="event in displayedEvents"
        :key="event.id"
        class="bg-white border rounded p-[2vw] shadow"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-blue-400 font-semibold">{{ getField(event, 'Title') }}</h3>
        <span class="text-gray-600">{{ event.Time }}</span>
      </div>

      <div class="mt-4 flex flex-col md:flex-row md:items-center md:gap-4">
        <nuxt-link
            :to="`/activityPage/${event.Course_Id}`"
            class="px-4 py-2 text-white bg-blue-300 rounded hover:bg-blue-400"
        >
          {{ currentLang === 'it' ? 'Tipo Corso' : 'Course type' }}:
          <strong>{{ getField(event, 'Course_title') }}</strong>
        </nuxt-link>

        <nuxt-link
            :to="`/teacherPage/${event.Teacher_id}`"
            class="px-4 py-2 text-white bg-blue-300 rounded hover:bg-blue-400"
        >
          {{ currentLang === 'it' ? 'Insegnante' : 'Teacher' }}:
          <strong>{{ getField(event, 'Teacher_name') }}</strong>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
