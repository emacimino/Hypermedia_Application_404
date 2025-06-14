import { defineStore } from 'pinia'

export interface HighlightItem {
    id: number
    title: { en: string; it: string }
    subtitle: { en: string; it: string }
    badge?: string
    link: string;
}

interface Title{
    Title: string
    Title_it: string
}

export const useHighlightsStore = defineStore('highlights', {
    state: () => ({
        highlights: [] as HighlightItem[],
        title: null as Title | null
    }),

    actions: {
        async fetchHighlights(supabase: any) {
            const { data, error } = await supabase
                .from('Activities')
                .select(`
          Id,
          Sponsor_title,
          Sponsor_paragraph,
          Sponsor_title_it,
          Sponsor_paragraph_it,
          Image
        `)
                .not('Sponsor_title', 'is', null) // almeno Sponsor_title non deve essere null
                .order('Id', { ascending: true })

            if (error || !data) {
                console.error('Errore nel recupero Highlights da Activities:', error)
                return
            }

            this.highlights = data.map((item: any) => ({
                id: item.Id,
                title: {
                    en: item.Sponsor_title ?? '',
                    it: item.Sponsor_title_it ?? '',
                },
                subtitle: {
                    en: item.Sponsor_paragraph ?? '',
                    it: item.Sponsor_paragraph_it ?? '',
                },
                link: item.Image

            }))
        },
        async fetchTitle(supabase: any){
            const { data, error } = await supabase
                .from("Presentation")
                .select("*")
                .in('Id', [14])

            if (error || !data || data.length === 0) {
                console.error("Errore nel recupero del titolo da Presentation:", error)
                return
            }

            this.title = {
                Title: data[0].Title ?? '',
                Title_it: data[0].Title_it ?? ''
            }
        }

    }
})
