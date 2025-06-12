import { defineStore } from 'pinia'

export interface TimelineItem {
    Date: string
    Icon: string
    Title: string
    Title_it?: string
    Description: string
    Description_it?: string
}

export const useTimelineStore = defineStore('timeline', {
    state: () => ({
        items: [] as TimelineItem[]
    }),

    actions: {
        async fetchTimeline(supabase: any) {
            const { data, error } = await supabase
                .from('Timeline')
                .select('*')
                .order('Date', { ascending: true })

            if (!error && data) {
                this.items = data
            } else {
                console.error('Error fetching timeline:', error)
            }
        }
    }
})
