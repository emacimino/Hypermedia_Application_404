import { defineStore } from 'pinia'
import type { SubscriptionItem } from '~/types/models'

export const useSubscriptionStore = defineStore('subscription', {
    state: () => ({
        items: [] as SubscriptionItem[] // Holds the list of submitted subscriptions (optional usage)
    }),

    actions: {
        /**
         * Submits subscription form data to the backend API.
         * This action is called from the component when the user submits the form.
         */
        async submitSubscription(formData: {
            firstName: string,
            lastName: string,
            email: string,
            message: string,
            type: string
        }) {
            try {
                // Make a POST request to the API endpoint with the form data
                const { data, error } = await useFetch<{ success?: boolean, error?: string }>('/api/activities/subscription', {
                    method: 'POST',
                    body: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        message: formData.message,
                        type: formData.type
                    }
                })

                // Handle fetch-level errors
                if (error.value) throw error.value

                // If the response doesn't indicate success, throw a custom error
                if (!data.value?.success) throw new Error('API did not return success')

                return true // Indicate successful submission
            } catch (error) {
                // Log the error and re-throw it for the UI to handle
                console.error('Error submitting subscription:', error)
                throw error
            }
        }
    }
})
