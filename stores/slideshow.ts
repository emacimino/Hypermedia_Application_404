import { defineStore } from 'pinia'

interface Presentation {
    Title: string
    ImageUrl: string
    Course_Id: number
}

export const useSlideStore = defineStore('slide', {
    state: () => ({
        slides: [] as Presentation[]
    }),
    actions: {
        async fetchImages (currentLang: string, supabase: any) {
            const { data, error } = await supabase.from('Slideshow').select('Title, ImageUrl,Course_Id')
            if (error) console.error('Errore slideshow:', error)

            this.slides = data ?? []
        }

    }
})