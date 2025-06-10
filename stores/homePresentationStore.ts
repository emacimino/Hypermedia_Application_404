import { defineStore } from 'pinia'

export const useHomePresentationStore = defineStore('homePresentation', {
    state: () => ({
        firstPresentation: null as Presentation | null,
        secondPresentation: null as Presentation | null,
    }),
    actions: {
        async fetchPresentationContent(supabase: any) {
            const { data, error } = await supabase
                .from<Presentation>('Presentation')
                .select('*')
                .in('Id', [4, 5])

            if (error) {
                console.error('Error fetching presentations:', error)
                return
            }

            this.firstPresentation = data.find(p => p.Id === 4) ?? null
            this.secondPresentation = data.find(p => p.Id === 5) ?? null
        }
    }
})
