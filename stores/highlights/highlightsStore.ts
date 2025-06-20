import { defineStore } from 'pinia'

import type { HighlightItem } from '~/types/models'
import type { LocalizedTitle } from '~/types/models'



//Get the about us presentation content API
export const useHighlightsStore = defineStore('highlights', {
    state: () => ({
        highlights: [] as HighlightItem[],
        title: null as LocalizedTitle | null
    }),

    actions: {
        async fetchAllHighlights(currentLang: string) {
            const { data, error } = await useFetch<{
                highlights: HighlightItem[]
                title: LocalizedTitle
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
