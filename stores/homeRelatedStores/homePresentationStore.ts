import { defineStore } from 'pinia'

interface Presentation {
    Id: number
    Title: string
    Title_it: string
    Paragraph: string
    Paragraph_it: string
    Image: string
}

export const useHomePresentationStore = defineStore('homePresentation', {
    state: () => ({
        firstPresentation: null as Presentation | null,
        secondPresentation: null as Presentation | null,
    }),

    actions: {
        async fetchPresentationContent() {
            const { data, error } = await useFetch('/api/homePage/homeDescription')

            if (error.value) {
                console.error('Fetch error:', error.value)
                return
            }

            if (!data.value) {
                console.warn('API ha risposto con null')
                return
            }

            this.firstPresentation = data.value.firstPresentation ?? null
            this.secondPresentation = data.value.secondPresentation ?? null
        }
    }
})
