import { defineStore } from 'pinia'

import type { HighlightItem } from '~/types/models'
import type { Title } from '~/types/models'



//Get the about us presentation content API
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
