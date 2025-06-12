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
        content: null as PresentationContent | null
    }),

    actions: {
        async fetchAboutUs(supabase: any) {
            const { data, error } = await supabase
                .from('Presentation')
                .select('*')
                .eq('Id', 3)
                .single()

            if (!error) this.content = data
            else console.error('Supabase error (about us):', error)
        }
    }
})
