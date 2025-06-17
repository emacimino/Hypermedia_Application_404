import { defineStore } from 'pinia'

interface RawActivity {
    Id: number
    Image: string
    Link: string
    Title: string
    Title_it: string
    ShortDescription_it: string
    ShortDescription: string
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
        async fetchActivities(currentLang: string) {
            const { data, error } = await useFetch('/api/activities')

            if (error.value) {
                console.error('Fetch error:', error.value)
                return
            }

            const { presRaw, cardsRaw } = data.value as {
                presRaw: RawPresentation[]
                cardsRaw: RawActivity[]
            }

            this.presentationData = presRaw.map(item => ({
                Title: currentLang === 'it' ? item.Title_it : item.Title,
                Paragraph: currentLang === 'it' ? item.Paragraph_it : item.Paragraph,
                Image: item.Image
            }))

            this.cardsValues = cardsRaw.map(item => ({
                ...item,
                Title: currentLang === 'it' ? item.Title_it : item.Title,
                Title_it: currentLang === 'en' ? item.Title : item.Title_it,
                ShortDescription: currentLang === 'it' ? item.ShortDescription_it : item.ShortDescription,
                ShortDescription_it: currentLang === 'en' ? item.ShortDescription : item.ShortDescription_it
            }))
        }
    }
})
