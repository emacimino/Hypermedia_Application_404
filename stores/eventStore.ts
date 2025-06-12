function getWeekDates(base: Date): { start: string; end: string; weekdays: string[] } {
    const start = new Date(base)
    start.setDate(base.getDate() - base.getDay()) // Sunday
    const end = new Date(start)
    end.setDate(start.getDate() + 6)

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

export const useEventsStore = defineStore('events', {
    state: () => ({
        weeklyEvents: [] as EventItem[]
    }),

    actions: {
        async fetchWeeklyEvents(baseDate?: Date) {
            const supabase = useSupabaseClient()
            const date = baseDate ?? new Date()
            const { start, end, weekdays } = getWeekDates(date)

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

            this.weeklyEvents = [...(onetimeEvents ?? []), ...(recurringEvents ?? [])]
        }
    }
})
