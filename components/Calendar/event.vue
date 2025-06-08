<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '@/composables/useLanguage'

const supabase = useSupabaseClient()
const { currentLang } = useLanguage()

const getField = (entry: any, key: string) => {
  return currentLang.value === 'it' ? entry[`${key}_it`] ?? entry[key] : entry[key]
}

const weeklyEvents = ref([])

function getCurrentWeekDates(): { start: string; end: string; weekdays: string[] } {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay()) // Sunday
  const end = new Date(start)
  end.setDate(start.getDate() + 6) // Saturday

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const weekDaysInRange = []
  for (let i = 0; i < 7; i++) {
    weekDaysInRange.push(weekdays[(start.getDay() + i) % 7])
  }

  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
    weekdays: weekDaysInRange
  }
}

onMounted(async () => {
  const { start, end, weekdays } = getCurrentWeekDates()

  const { data: onetimeEvents, error: err1 } = await supabase
      .from('Events')
      .select('*')
      .eq('Type', 'onetime')
      .gte('Date', start)
      .lte('Date', end)

  if (err1) console.error('Errore eventi one-time:', err1)

  const { data: recurringEvents, error: err2 } = await supabase
      .from('Events')
      .select('*')
      .eq('Type', 'recurring')
      .in('Weekday', weekdays)

  if (err2) console.error('Errore eventi ricorrenti:', err2)

  weeklyEvents.value = [...(onetimeEvents ?? []), ...(recurringEvents ?? [])]
})
</script>

<template>
  <div class="p-4">
    <EventDayView :events="weeklyEvents" />
  </div>
</template>
