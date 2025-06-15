<script setup lang="ts">
import { CalendarIcon } from "@heroicons/vue/24/outline"
import dayjs from "dayjs"
import 'dayjs/locale/it';
import 'dayjs/locale/en';
import { ref, computed, onMounted, watch } from "vue"
import { useLanguage } from '@/composables/useLanguage'
import { useEventsStore } from '~/stores/eventStore'

const { currentLang } = useLanguage()
const eventsStore = useEventsStore()

const getField = (entry: any, key: string) => {
  return currentLang.value === 'it' ? entry[`${key}_it`] ?? entry[key] : entry[key]
}

const weekdayLabels = computed(() =>
    currentLang.value === 'it'
        ? ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
        : ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
)

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

const internalDate = ref(props.currentDate ?? dayjs())
const selectedLocalDate = ref((props.activeDate ?? internalDate.value).startOf('isoWeek'))
const selectedLocalIndex = ref(props.selectedWeekdayIndex ?? ((selectedLocalDate.value.day() + 6) % 7))

const internalActiveDate = computed(() => props.activeDate ?? selectedLocalDate.value)
const internalWeekdayIndex = computed(() => props.selectedWeekdayIndex ?? selectedLocalIndex.value)

const localizedDate = computed(() =>
    internalActiveDate.value.locale(currentLang.value).format('dddd DD MMMM')
)

const formattedWeekDate = computed(() =>
    (props.currentDate ?? internalDate.value)
        .locale(currentLang.value)
        .format("DD MMM YYYY")
)

const displayedEvents = computed(() => {
  const source = props.dayEvents ?? eventsStore.weeklyEvents
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
    const newWeekStart = dayjs(props.currentDate).subtract(1, 'week').startOf('isoWeek')
    const newActiveDate = newWeekStart.add(internalWeekdayIndex.value, 'day')
    emit('update:activeDate', newActiveDate)
  } else {
    internalDate.value = internalDate.value.subtract(1, 'week')
    selectedLocalDate.value = internalDate.value.startOf('isoWeek')
    const newActiveDate = selectedLocalDate.value.add(internalWeekdayIndex.value, 'day')
    emit('update:activeDate', newActiveDate)
    if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
  }
}

function goToNextWeek() {
  if (props.currentDate) {
    emit('navigate', 'next')
    const newWeekStart = dayjs(props.currentDate).add(1, 'week').startOf('isoWeek')
    const newActiveDate = newWeekStart.add(internalWeekdayIndex.value, 'day')
    emit('update:activeDate', newActiveDate)
  } else {
    internalDate.value = internalDate.value.add(1, 'week')
    selectedLocalDate.value = internalDate.value.startOf('isoWeek')
    const newActiveDate = selectedLocalDate.value.add(internalWeekdayIndex.value, 'day')
    emit('update:activeDate', newActiveDate)
    if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
  }
}

function resetToCalendar() {
  emit('back')
}

onMounted(() => {
  if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
})

watch(() => internalDate.value.format("YYYY-MM-DD"), () => {
  if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
})

watch(() => selectedLocalDate.value.format("YYYY-MM-DD"), () => {
  if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
})
</script>


<template>
  <div class="flex justify-between items-center my-[2vw] px-[2vw]">
    <button @click="goToPreviousWeek" class="px-[2vw] py-[0.8vw] bg-gray-200 text-blue-500 rounded hover:bg-gray-300">
      ← {{currentLang == 'it' ? 'Settimana precedente' : 'Previous Week' }}
    </button>

    <span class="font-semibold text-center">
      {{ currentLang === 'it' ? 'Settimana ' + formattedWeekDate : formattedWeekDate + ' week' }}
      <button v-if="visualizeButton" @click="resetToCalendar" class="ml-[1vw] px-[1.5vw] py-[0.8vw] bg-blue-300 text-white rounded hover:bg-blue-400">
        <CalendarIcon class="inline w-[1.8vw] h-[1.8vw]" />
      </button>
    </span>

    <button @click="goToNextWeek" class="px-[2vw] py-[0.8vw] text-blue-500 bg-gray-200 rounded hover:bg-gray-300">
      {{currentLang == 'it' ? 'Settimana successiva' : 'Next Week' }} →
    </button>
  </div>

  <div class="grid grid-cols-7 gap-[1vw] text-center mb-[2vw] px-[1vw]">
    <button
        v-for="(day, index) in weekdayLabels"
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
      {{ currentLang === 'it' ? 'Eventi di' : 'Events for' }} {{ localizedDate }}

    </h2>

    <div v-if="displayedEvents.length === 0" class="text-blue-500 italic">
      {{ currentLang == 'it' ? 'Nessun evento' : 'No events' }}
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
            class="px-4 py-2 text-white bg-blue-300 rounded hover:bg-blue-400 hover:scale-105 active:bg-blue-400 active:scale-105"
        >
          {{ currentLang === 'it' ? 'Tipo Corso' : 'Course type' }}:
          <strong>{{ getField(event, 'Course_title') }}</strong>
        </nuxt-link>

        <nuxt-link
            :to="`/teacherPage/${event.Teacher_id}`"
            class="px-4 py-2 text-white bg-blue-300 rounded hover:bg-blue-400 hover:scale-105 active:bg-blue-400 active:scale-105"
        >
          {{ currentLang === 'it' ? 'Insegnante' : 'Teacher' }}:
          <strong>{{ getField(event, 'Teacher_name') }}</strong>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
