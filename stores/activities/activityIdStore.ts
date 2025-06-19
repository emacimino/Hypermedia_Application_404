import { defineStore } from 'pinia'
import type { ActivityDetails } from '~/types/models'

// Store to fetch and hold the data of a specific activity by ID
export const useActivityIdStore = defineStore('activityIdPresentation', {
    state: () => ({
        activity: null as ActivityDetails | null,
    }),

    actions: {
        async fetchActivity(activityId: number) {
            console.log('Fetching activity with ID:', activityId)

            const { data, error } = await useFetch<{ activity: ActivityDetails | null }>(
                `/api/activities/id?id=${activityId}`
            )

            if (error.value || !data.value || !data.value.activity) {
                console.error('Error while loading activity:', error.value)
                this.activity = null
                return
            }

            this.activity = data.value.activity
        }
    }
})
