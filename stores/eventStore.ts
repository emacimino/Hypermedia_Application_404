import { defineStore } from 'pinia'
import type { EventItem } from '~/types/models'

export const useEventsStore = defineStore('events', {
    state: () => ({
        weeklyEvents: [] as EventItem[]
    }),

    actions: {
        async fetchWeeklyEvents(baseDate?: Date) {
            const base = (baseDate ?? new Date()).toISOString()
            const { data, error } = await useFetch<{ weeklyEvents: EventItem[] }>(
                `/api/events/weekly?base=${encodeURIComponent(base)}`
            )

            if (error.value || !data.value) {
                console.error('Errore caricamento eventi:', error.value)
                this.weeklyEvents = []
                return
            }

            this.weeklyEvents = data.value.weeklyEvents
        }
    }
})
