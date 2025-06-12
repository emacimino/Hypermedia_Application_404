<script setup lang="ts">
import { watch, onMounted, ref } from "vue"
import dayjs from "dayjs"

type SelectedValues = {
  year: number
  month: number
}

const dateProps = defineProps<{
  selectedValues: SelectedValues
  selectedDate: number | null
}>()

const dateEmit = defineEmits<{
  (e: "selected", v: number): void
}>()

type CalendarDate = {
  day: number
  date: number
}

const dates = ref<CalendarDate[]>([])
const date = ref<number | null>(null)

const { currentLang } = useLanguage()

const days = computed(() =>
    currentLang.value === 'it'
        ? ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
)
onMounted(() => {
  generateDatesForThatMonth(dateProps.selectedValues.month, dateProps.selectedValues.year)
})

watch(() => dateProps.selectedValues, (v) => {
  date.value = null
  generateDatesForThatMonth(v.month, v.year)
}, { deep: true })

function generateDatesForThatMonth(m: number = dayjs().month(), y: number = dayjs().year()) {
  dates.value = []
  const d = dayjs().year(y).month(m)
  const daysInMonth = d.daysInMonth()

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDay = d.date(i).day() // 0=Sunday ... 6=Saturday
    dates.value.push({ date: i, day: currentDay })
  }
}

function selected(d: number) {
  date.value = d
  dateEmit("selected", d)
}
</script>

<template>
  <div class="w-full bg-gray-200 p-2 rounded-b-md">
    <div class="grid grid-cols-7 place-items-center gap-x-2 gap-y-4">
      <div v-for="day in days" :key="day">
        <span class="text-[#1F3A5F] font-semibold">{{ day }}</span>
      </div>

      <template v-for="(d, index) in dates" :key="index">
        <template v-if="index === 0">
          <div
              v-for="n in (d.day === 0 ? 6 : d.day - 1)"
              :key="'empty-' + n"
              class="w-9 h-9"
          ></div>
        </template>

        <button
            @click="selected(d.date)"
            class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer hover:rounded-full hover:bg-blue-300"
            :class="{
            'bg-blue-400 text-gray-100': d.date === dayjs().date() &&
              dateProps.selectedValues.month === dayjs().month() &&
              dateProps.selectedValues.year === dayjs().year(),
            'bg-blue-500 text-white': d.date === date
          }"
        >
          <span>{{ d.date }}</span>
        </button>
      </template>
    </div>
  </div>
</template>
