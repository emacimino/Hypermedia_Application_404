import { defineStore } from 'pinia'
import type { EventItem } from '~/types/models'
import dayjs from 'dayjs'
//Get the events presentation content API
export const useAllEventsStore = defineStore('allEvents', {
    state: () => ({
        weeklyEvents: [] as EventItem[]
    }),

    actions: {
        async fetchWeeklyEvents(base: dayjs.Dayjs) {
            const baseISO = base.toISOString()

            const { data, error } = await useFetch<{ weeklyEvents: EventItem[] }>(
                `/api/events/weeklyCalendarEvents?base=${encodeURIComponent(baseISO)}`
            )

            if (error.value || !data.value) {
                console.error('Errore nel caricamento eventi settimanali:', error.value)
                this.weeklyEvents = []
                return
            }

            this.weeklyEvents = data.value.weeklyEvents
        }
    }
})
