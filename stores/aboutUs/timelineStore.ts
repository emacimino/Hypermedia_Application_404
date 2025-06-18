import { defineStore } from 'pinia'

export interface TimelineItem {
    Date: string
    Icon: string
    Title: string
    Title_it: string
    Description: string
    Description_it: string
}
//Get the timeline content API
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
