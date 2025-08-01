<template>
  <div class="flex justify-between items-center my-6 px-6 w-full max-w-screen-2xl mx-auto">
    <!-- Button to go to previous week -->

    <div class="flex-1 flex justify-start">
      <button
          @click="goToPreviousWeek"
          class="px-6 py-2 bg-gray-200 text-blue-500 rounded hover:bg-gray-300"
          style="font-size: clamp(1rem, 1.5vw, 1.75rem)"
      >
        ← {{ currentLang == 'it' ? 'Settimana precedente' : 'Previous Week' }}
      </button>
    </div>
    <!-- Calendar toggle button -->

    <div class="flex-1 flex justify-center">
      <button
          v-if="visualizeButton"
          @click="resetToCalendar"
          class="px-4 py-2 btn-link"
      >
        <CalendarIcon class="inline" style="width: clamp(1.5rem, 2vw, 2.5rem); height: clamp(1.5rem, 2vw, 2.5rem)" />
      </button>
    </div>
    <!-- Button to go to next week -->
    <div class="flex-1 flex justify-end">
      <button
          @click="goToNextWeek"
          class="px-6 py-2 text-blue-500 bg-gray-200 rounded hover:bg-gray-300"
          style="font-size: clamp(1rem, 1.5vw, 1.75rem)"
      >
        {{ currentLang == 'it' ? 'Settimana successiva' : 'Next Week' }} →
      </button>
    </div>
  </div>

  <!-- Grid of weekday labels -->
  <div class="grid grid-cols-7 gap-4 text-center mb-6 px-4 max-w-screen-2xl mx-auto">
    <button
        v-for="(day, index) in weekdayLabels"
        :key="index"
        @click="selectDay(index)"
        :class="[
        'py-3 rounded font-semibold w-full transition-transform',
        'hover:scale-105 hover:bg-blue-300 active:scale-105 active:bg-blue-300',
        index === internalWeekdayIndex ? 'bg-blue-300 text-white' : 'bg-gray-100 text-blue-500'
      ]"
        style="font-size: clamp(1rem, 1.2vw, 1.5rem)"
    >
      {{ day }}
    </button>
  </div>

  <!-- Heading showing localized date of selected weekday -->
  <div class="space-y-6 px-6 max-w-screen-2xl mx-auto">
    <h2 class="font-semibold" style="font-size: clamp(1.5rem, 2vw, 2.75rem)">
      {{ currentLang === 'it' ? 'Eventi di' : 'Events for' }} {{ localizedDate }}
    </h2>

    <!-- Message when no events are available -->
    <div v-if="displayedEvents.length === 0" class="text-blue-500 italic" style="font-size: clamp(1rem, 1.2vw, 1.5rem)">
      {{ currentLang == 'it' ? 'Nessun evento' : 'No events' }}
    </div>

    <div :class="wrapperClass">
      <div class="flex flex-col space-y-4 space-x-2">
        <!-- Render each event in a styled card -->
        <div
            v-for="event in displayedEvents"
            :key="event.id"
            class="bg-white border rounded p-6 shadow"
        >
          <div class="flex justify-between items-center">
            <h3 class="text-blue-400 font-semibold" style="font-size: clamp(1.25rem, 1.75vw, 2rem)">
              {{ getField(event, 'Title') }}
            </h3>
            <span class="text-gray-600" style="font-size: clamp(0.875rem, 1vw, 1.25rem)">
              {{ event.Time }}
            </span>
          </div>
          <!-- Event details: course and teacher links -->
          <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 mt-2">
            <nuxt-link
                v-if="!isActivity"
                :to="`/activities/${event.Course_Id}`"
                class="btn-link"
                style="font-size: clamp(1rem, 1.2vw, 1.4rem)"
            >
              {{ currentLang === 'it' ? 'Tipo Corso' : 'Course type' }}:
              <strong>{{ getField(event, 'Course_title') }}</strong>
            </nuxt-link>
            <!-- Link to teacher page, if not viewing as teacher -->
            <nuxt-link
                v-if="!isTeacher"
                :to="`/teachers/${event.Teacher_id}`"
                class="btn-link"
                style="font-size: clamp(1rem, 1.2vw, 1.4rem)"
            >
              {{ currentLang === 'it' ? 'Insegnante' : 'Teacher' }}:
              <strong>{{ getField(event, 'Teacher_name') }}</strong>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon } from "@heroicons/vue/24/outline"
import dayjs from "dayjs"
import 'dayjs/locale/it';
import 'dayjs/locale/en';
import { ref, computed, onMounted, watch } from "vue"
import { useLanguage } from '@/composables/useLanguage'
import { useEventsStore } from '~/stores/events/eventStore'

const { currentLang } = useLanguage()
const eventsStore = useEventsStore()

// Utility to get the localized field
const getField = (entry: any, key: string) => {
  return currentLang.value === 'it' ? entry[`${key}_it`] ?? entry[key] : entry[key]
}

// Labels for weekdays
const weekdayLabels = computed(() =>
    currentLang.value === 'it'
        ? ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
        : ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
)

const props = withDefaults(
    defineProps<{
      currentDate?: any
      activeDate?: any
      selectedWeekdayIndex?: number | null
      dayEvents?: any[] | null
      visualizeButton?: boolean
      isTeacher?: boolean
      isActivity?: boolean
    }>(),
    {
      isTeacher: false,
      isActivity: false
    }
)

// Define emitted events
const emit = defineEmits<{
  (e: 'back'): void
  (e: 'navigate', dir: 'prev' | 'next'): void
  (e: 'update:activeDate', v: any): void
  (e: 'update:selectedWeekdayIndex', v: number): void
  (e: 'day-click', v: any): void
}>()

// Internal state to track current and selected week data
const internalDate = ref((props.activeDate ?? props.currentDate ?? dayjs()).startOf('isoWeek'))

// The selected active date within the current week
const selectedLocalDate = ref(props.activeDate ?? dayjs())

// Index of the selected day (0=Monday, 6=Sunday)
const selectedLocalIndex = ref(
    props.selectedWeekdayIndex ?? (selectedLocalDate.value.isoWeekday() - 1)
)



// Use computed fallbacks when parent does not control state
const internalActiveDate = computed(() => props.activeDate ?? selectedLocalDate.value)
const internalWeekdayIndex = computed(() => props.selectedWeekdayIndex ?? selectedLocalIndex.value)

// Localized string representing the selected date
const localizedDate = computed(() =>
    internalActiveDate.value.locale(currentLang.value).format('dddd DD MMMM')
)


const formattedWeekDate = computed(() =>
    (props.currentDate ?? internalDate.value)
        .locale(currentLang.value)
        .format("DD MMM YYYY")
)

// Filter events based on whether they are one-time or recurring
const displayedEvents = computed(() => {
  const source = props.dayEvents ?? eventsStore.weeklyEvents
  const dateStr = internalActiveDate.value.format("YYYY-MM-DD")
  const weekdayStr = internalActiveDate.value.locale('en').format("dddd")

  return source.filter(event =>
      (event.Type === 'onetime' && event.Date === dateStr) ||
      (event.Type === 'recurring' && event.Weekday === weekdayStr)
  )
})

// When a weekday is selected, update active date and weekday index
function selectDay(index: number) {
  const selected = (props.currentDate ?? internalDate.value).startOf('isoWeek').add(index, 'day')
  if (props.activeDate) emit('update:activeDate', selected)
  else selectedLocalDate.value = selected

  if (props.selectedWeekdayIndex != null) emit('update:selectedWeekdayIndex', index)
  else selectedLocalIndex.value = index

  emit('day-click', selected)
}

// Move view to the previous week and fetch events if needed
function goToPreviousWeek() {
  if (props.currentDate) {
    emit('navigate', 'prev')
    const newWeekStart = dayjs(props.currentDate).subtract(1, 'week').startOf('isoWeek')
    const newActiveDate = newWeekStart.add(internalWeekdayIndex.value, 'day')
    emit('update:activeDate', newActiveDate)
  } else {
    internalDate.value = internalDate.value.subtract(1, 'week').startOf('isoWeek')
    selectedLocalDate.value = internalDate.value.add(internalWeekdayIndex.value, 'day')

    const newActiveDate = selectedLocalDate.value.add(internalWeekdayIndex.value, 'day')
    emit('update:activeDate', newActiveDate)
    if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
  }
}

// Move view to the next week and fetch events if needed
function goToNextWeek() {
  if (props.currentDate) {
    emit('navigate', 'next')
    const newWeekStart = dayjs(props.currentDate).add(1, 'week').startOf('isoWeek')
    const newActiveDate = newWeekStart.add(internalWeekdayIndex.value, 'day')
    emit('update:activeDate', newActiveDate)
  } else {
    internalDate.value = internalDate.value.add(1, 'week').startOf('isoWeek')
    selectedLocalDate.value = internalDate.value.add(internalWeekdayIndex.value, 'day')
    const newActiveDate = selectedLocalDate.value.add(internalWeekdayIndex.value, 'day')
    emit('update:activeDate', newActiveDate)
    if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
  }
}

// Resets to calendar view by emitting 'back'
function resetToCalendar() {
  emit('back')
}

// Initial fetch of weekly events when component mounts
onMounted(() => {
  if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
})

// Re-fetch events when the current date or week changes
watch(() => internalDate.value.format("YYYY-MM-DD"), () => {
  if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
})

watch(() => selectedLocalDate.value.format("YYYY-MM-DD"), () => {
  if (!props.dayEvents) eventsStore.fetchWeeklyEvents(internalDate.value.toDate())
})

// Add scroll area if there are many events
const wrapperClass = computed(() =>
    displayedEvents.value.length > 4
        ? 'max-h-96 overflow-y-auto'
        : ''
)
</script>




<style module>

</style>
