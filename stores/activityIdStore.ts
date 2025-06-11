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
}

export const useActivityIdStore = defineStore('activityIdPresentation', {
    state: () => ({
        activity: null as RawActivity | null,
    }),
    actions: {
        async fetchActivity(activityId: number, supabase: any) {
            if (isNaN(activityId)) return

            const { data, error } = await supabase
                .from("Activities")
                .select(`*, Events:Events ( * )`)
                .eq("Id", activityId)
                .single()

            if (error || !data) {
                console.error('Errore nel caricamento attività:', error)
                this.activity = null
                return
            }

            this.activity = data
        }
    }
})
