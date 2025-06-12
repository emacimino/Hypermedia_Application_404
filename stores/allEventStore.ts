import { defineStore } from 'pinia'

export const useAllEventsStore = defineStore('allEvents', {
    state: () => ({
        weeklyEvents: [] as EventItem[]
    }),

    actions: {
        async fetchWeeklyEvents(base ,supabase) {
            const startOfWeek = base.startOf('isoWeek')
            const endOfWeek = base.endOf('isoWeek')
            const from = startOfWeek.format("YYYY-MM-DD")
            const to = endOfWeek.format("YYYY-MM-DD")
            const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

            const {data: onetimeEvents} = await supabase
                .from("Events")
                .select("*")
                .eq("Type", "onetime")
                .gte("Date", from)
                .lte("Date", to)

            const {data: recurringEvents} = await supabase
                .from("Events")
                .select("*")
                .eq("Type", "recurring")
                .in("Weekday", weekdays)

            this.weeklyEvents = [...(onetimeEvents ?? []), ...(recurringEvents ?? [])]
        }
    }
})