import { defineStore } from 'pinia'

export const useSlideStore = defineStore('slide', {
    state: () => ({
        slides: null as Presentation | null,
    }),
    actions: {
        async fetchImages (currentLang: string, supabase: any) {
            const { data, error } = await supabase.from('Slideshow').select('Title, ImageUrl,Course_Id')
            if (error) console.error('Errore slideshow:', error)

            this.slides = data
        }

    }
})