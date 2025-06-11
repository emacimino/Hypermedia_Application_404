import { defineStore } from 'pinia'

interface RawActivity {
    Id: number
    Title: string
    Title_it: string
    ShortDescription_it: string
    ShortDescription: string
    Image: string
    Link: string
}

interface RawPresentation {
    Title: string
    Title_it: string
    Paragraph: string
    Paragraph_it: string
    Image: string
}

interface PresentationItem {
    Title: string
    Paragraph: string
    Image: string
}

export const useActivityStore = defineStore('activityPresentation', {
    state: () => ({
        presentationData: [] as PresentationItem[],
        cardsValues: [] as RawActivity[],
    }),
    actions: {
        async fetchActivities(currentLang: string, supabase: any) {
            const { data: presRaw } = await supabase.from('Presentation').select('*').eq('Id', 6)
            const { data: cardsRaw } = await supabase.from('Activities').select('*')

            const presData = ((presRaw || []) as RawPresentation[]).map((item) => ({
                Title: currentLang === 'it' ? item.Title_it : item.Title,
                Paragraph: currentLang === 'it' ? item.Paragraph_it : item.Paragraph,
                Image: item.Image,
            }))

            const cards = ((cardsRaw || []) as RawActivity[]).map((item) => ({
                Id: item.Id,
                Image: item.Image,
                Link: item.Link,
                Title: currentLang === 'it' ? item.Title_it : item.Title,
                Title_it: currentLang === 'en' ? item.Title : item.Title_it,
                ShortDescription: currentLang === 'it' ? item.ShortDescription_it : item.ShortDescription,
                ShortDescription_it: currentLang === 'en' ? item.ShortDescription : item.ShortDescription_it,
            }))

            this.presentationData = presData
            this.cardsValues = cards
        }
    }
})
