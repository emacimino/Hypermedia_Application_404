import { defineStore } from 'pinia'
import type { RawPresentation, PresentationItem, TeacherCard } from '~/types/models'

//Get the teacher info from API and map to the used interface
export const useTeacherStore = defineStore('teacherPresentation', {
    state: () => ({
        teacherData: [] as PresentationItem[],
        teacherCardsValues: [] as TeacherCard[],
    }),
    actions: {
        async fetchTeachers(currentLang: string, supabase: any) {
            const { data, error } = await useFetch('/api/teachers')
            const { presRaw, cardsRaw } = data.value as {
                presRaw: RawPresentation[]
                cardsRaw: TeacherCard[]
            }

            const presData = (presRaw || []).map((item) => ({
                Title: currentLang === 'it' ? item.Title_it : item.Title,
                Paragraph: currentLang === 'it' ? item.Paragraph_it : item.Paragraph,
                Image: item.Image,
            }))

            const cards = (cardsRaw || []).map((item) => ({
                Id: item.Id,
                Image: item.Image,
                Link: item.Link,
                Title: item.Title,
                Title_it: item.Title_it,
                ShortDescription: currentLang === 'it' ? item.ShortDescription_it : item.ShortDescription,
                ShortDescription_it: currentLang === 'it' ? item.ShortDescription_it : item.ShortDescription,
            }))

            this.teacherData = presData
            this.teacherCardsValues = cards
        },
    },
})
