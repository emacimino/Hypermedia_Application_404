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
  <div class="flex justify-between items-center my-[2vw] px-[2vw]">
    <button
        @click="goToPreviousWeek"
        class="px-[2vw] py-[0.8vw] bg-gray-200 text-blue-500 rounded hover:bg-gray-300 text-[clamp(14px,1.1vw,18px)]"
    >
      ← Settimana precedente
    </button>

    <span class="font-semibold text-[clamp(14px,1.2vw,20px)] text-center">
      {{ (props.currentDate ?? internalDate).format("DD MMM YYYY") }} week
      <button
          v-if="visualizeButton === true"
          @click="resetToCalendar"
          class="ml-[1vw] px-[1.5vw] py-[0.8vw] bg-blue-300 text-white rounded hover:bg-blue-400"
      >
        <CalendarIcon class="inline w-[1.8vw] h-[1.8vw] min-w-[20px] min-h-[20px]" />
      </button>
    </span>

    <button
        @click="goToNextWeek"
        class="px-[2vw] py-[0.8vw] text-blue-500 bg-gray-200 rounded hover:bg-gray-300 text-[clamp(14px,1.1vw,18px)]"
    >
      Settimana successiva →
    </button>
  </div>

  <!-- Giorni della settimana -->
  <div class="grid grid-cols-7 gap-[1vw] text-center mb-[2vw] px-[1vw]">
    <button
        v-for="(day, index) in ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']"
        :key="index"
        @click="selectDay(index)"
        :class="[
        'py-[1.2vw] rounded font-semibold w-full text-[clamp(14px,1.1vw,18px)] transition-transform',
        'hover:scale-105 hover:bg-blue-300 active:scale-105 active:bg-blue-300',
        index === internalWeekdayIndex ? 'bg-blue-300 text-white' : 'bg-gray-100 text-blue-500'
      ]"
    >
      {{ day }}
    </button>
  </div>

  <!-- Eventi -->
  <div class="space-y-[2vw] px-[2vw]">
    <p class="text-[clamp(14px,1.1vw,18px)]">{{ paragraphs }}</p>

    <h2 class="text-[clamp(16px,1.4vw,22px)] font-semibold">
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
        <h3 class="text-blue-400 font-semibold text-[clamp(16px,1.3vw,20px)]">{{ event.Title }}</h3>
        <span class="text-[clamp(12px,1vw,16px)] text-gray-600">{{ event.Time }}</span>
      </div>

      <div class="mt-[1.5vw] flex flex-col md:flex-row md:items-center md:gap-[2vw]">
        <nuxt-link
            :to="`/activityPage/${event.Course_Id}`"
            class="inline-block px-[2vw] py-[1vw] mt-[1vw] md:mt-0 text-white bg-blue-300 rounded hover:bg-blue-400 active:bg-blue-800 transition-transform duration-200 hover:scale-105 active:scale-105 text-[clamp(14px,1.1vw,18px)]"
        >
          Tipo Corso: <strong>{{ event.Course_title }}</strong>
        </nuxt-link>

        <nuxt-link
            :to="`/teacherPage/${event.Teacher_id}`"
            class="inline-block px-[2vw] py-[1vw] mt-[1vw] md:mt-0 text-white bg-blue-300 rounded hover:bg-blue-400 active:bg-green-800 transition-transform duration-200 hover:scale-105 active:scale-105 text-[clamp(14px,1.1vw,18px)]"
        >
          Insegnante: <strong>{{ event.Teacher_name }}</strong>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

