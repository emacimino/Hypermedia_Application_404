import { defineStore } from 'pinia'

interface PresentationContent {
    Id: number
    Title: string
    Paragraph: string
    Image: string
    Title_it: string
    Paragraph_it: string
}

export const useAboutUsStore = defineStore('aboutUs', {
    state: () => ({
        content: null as PresentationContent | null,
        content2: null as PresentationContent | null
    }),

    actions: {
        async fetchAboutUs() {
            const response = await useFetch<{ content: PresentationContent | null; content2: PresentationContent | null }>('/api/aboutUs')

            if (response.error.value || !response.data.value) {
                console.error('Errore nel caricamento About Us:', response.error.value)
                this.content = null
                this.content2 = null
                return
            }

            this.content = response.data.value.content
            this.content2 = response.data.value.content2
        }
    }
})