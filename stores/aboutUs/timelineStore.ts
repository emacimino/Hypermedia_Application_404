import { defineStore } from 'pinia'
import type { TimelineItem } from "~/types/models"
//Get the timeline content
export const useTimelineStore = defineStore('timeline', {
    state: () => ({
        items: [] as TimelineItem[]
    }),

    actions: {
        async fetchTimeline(currentLang: string) {
            const { data, error } = await useFetch<{ items: TimelineItem[] }>(`/api/aboutUs/timeline?lang=${currentLang}`)

            if (error.value || !data.value) {
                console.error('Error fetching timeline:', error.value)
                return
            }

            this.items = data.value.items
        }
    }
})
