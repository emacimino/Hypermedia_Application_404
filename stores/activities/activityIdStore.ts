import { defineStore } from 'pinia'

interface EventItem {
    Id: number
    Course_id: number
    Date?: string
    Type?: string
    Teacher_name?: string
}

interface RawActivity {
    Id: number
    Title: string
    Title_it: string
    LongDescription: string
    LongDescription_it: string
    Image: string
    Events?: EventItem[]
    Course_leader?: {
        Id: number
        Title: string
    }
}
//Get the single activity content API
export const useActivityIdStore = defineStore('activityIdPresentation', {
    state: () => ({
        activity: null as RawActivity | null,
    }),
    actions: {
        async fetchActivity(activityId: number) {
            console.log(activityId)
            const { data, error } = await useFetch<{ activity: RawActivity | null }>(
                `/api/activities/id?id=${activityId}`
            )

            if (error.value || !data.value || !data.value.activity) {
                console.error('Errore nel caricamento attività:', error.value)
                this.activity = null
                return
            }

            this.activity = data.value.activity
        },
    }
})
