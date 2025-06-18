import { defineStore } from 'pinia'

export interface HighlightItem {
    id: number
    title: { en: string; it: string }
    subtitle: { en: string; it: string }
    link: string
}

interface Title {
    Title: string
    Title_it: string
}

export const useHighlightsStore = defineStore('highlights', {
    state: () => ({
        highlights: [] as HighlightItem[],
        title: null as Title | null
    }),

    actions: {
        async fetchAllHighlights(currentLang: string) {
            const { data, error } = await useFetch<{
                highlights: HighlightItem[]
                title: Title
            }>(`/api/highlights?lang=${currentLang}`)

            if (error.value || !data.value) {
                console.error('Error fetching highlights:', error.value)
                return
            }

            this.highlights = data.value.highlights
            this.title = data.value.title
        }
    }
})
