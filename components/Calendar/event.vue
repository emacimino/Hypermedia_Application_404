<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'


const supabase = useSupabaseClient();

const weeklyEvents = ref([])

function getCurrentWeekDates(): { start: string; end: string; weekdays: string[] } {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay()) // Domenica
  const end = new Date(start)
  end.setDate(start.getDate() + 6) // Sabato

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

  // Fetch onetime events (with explicit date)
  const { data: onetimeEvents, error: err1 } = await supabase
      .from('Events')
      .select('*')
      .eq('type', 'onetime')
      .gte('date', start)
      .lte('date', end)

  if (err1) console.error('Errore eventi one-time:', err1)

  // Fetch recurring events (match weekday)
  const { data: recurringEvents, error: err2 } = await supabase
      .from('Events')
      .select('*')
      .eq('type', 'recurring')
      .in('weekday', weekdays)

  if (err2) console.error('Errore eventi ricorrenti:', err2)

  weeklyEvents.value = [...(onetimeEvents ?? []), ...(recurringEvents ?? [])]
})
</script>

<template>
  <div class="p-4">
    <EventDayView :events="weeklyEvents" />
  </div>
</template>
