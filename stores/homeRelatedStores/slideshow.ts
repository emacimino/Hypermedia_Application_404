import { defineStore } from 'pinia'
import type { Slide } from '~/types/models'

//Get the content for slides data from API
export const useSlideStore = defineStore('slide', {
    state: () => ({
        slides: [] as Slide[]
    }),

    actions: {
        async fetchImages(currentLang: string) {
            const { data, error } = await useFetch<{ slides: Slide[] }>(`/api/slideshow?lang=${currentLang}`)

            if (error.value || !data.value) {
                console.error('Error loading slideshow:', error.value)
                return
            }

            this.slides = data.value.slides
        }
    }
})
