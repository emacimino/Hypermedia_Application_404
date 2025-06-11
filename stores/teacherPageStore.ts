import { defineStore } from 'pinia'

interface RawTeacher {
    Id: number
    Image: string
    Link: string
    Title: string
    Title_it: string
    ShortDescription: string
    ShortDescription_it: string
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

export const useTeacherStore = defineStore('teacherPresentation', {
    state: () => ({
        teacherData: [] as PresentationItem[],
        teacherCardsValues: [] as RawTeacher[],
    }),
    actions: {
        async fetchTeachers(currentLang: string, supabase: any) {
            const { data: presRaw } = await supabase.from('Presentation').select('*').eq('Id', 2)
            const { data: cardsRaw } = await supabase.from('Teachers').select('*')
            const presData = ((presRaw || []) as RawPresentation[]).map((item) => ({
                Title: currentLang === 'it' ? item.Title_it : item.Title,
                Paragraph: currentLang === 'it' ? item.Paragraph_it : item.Paragraph,
                Image: item.Image,
            }))

            const cards = ((cardsRaw || []) as RawTeacher[]).map((item) => ({
                Id: item.Id,
                Image: item.Image,
                Link: item.Link,
                Title: item.Title,
                Title_it: currentLang === 'en' ? item.Title : item.Title_it,
                ShortDescription: currentLang === 'it' ? item.ShortDescription_it : item.ShortDescription,
                ShortDescription_it: currentLang === 'en' ? item.ShortDescription : item.ShortDescription_it,
            }))
            this.teacherData = presData
            this.teacherCardsValues = cards
        },
    },
})
