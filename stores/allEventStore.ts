import { defineStore } from 'pinia'
import type { EventItem } from '~/types/models' // opzionale
import dayjs from 'dayjs'

export const useAllEventsStore = defineStore('allEvents', {
    state: () => ({
        weeklyEvents: [] as EventItem[]
    }),

    actions: {
        async fetchWeeklyEvents(base: dayjs.Dayjs) {
            const baseISO = base.toISOString()

            const { data, error } = await useFetch<{ weeklyEvents: EventItem[] }>(
                `/api/events/allCalendarEvents?base=${encodeURIComponent(baseISO)}`
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
