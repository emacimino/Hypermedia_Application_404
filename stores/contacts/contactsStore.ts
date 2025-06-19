import { defineStore } from 'pinia'
//Get the contacts presentation content from API

export const useContactsStore = defineStore('contacts', {
    state: () => ({
        whereAreWeTitle: '',
        whereAreWeParagraph: '',
        contactsTitle: '',
        contactsParagraph: '',
        openingHoursTitle: '',
        openingHoursParagraph: '',
    }),

    actions: {
        async fetchAllContent(currentLang: string) {
            const { data, error } = await useFetch<{
                whereAreWe: { title: string; paragraph: string }
                contacts: { title: string; paragraph: string }
                openingHours: { title: string; paragraph: string }
            }>(`/api/contacts?lang=${currentLang}`)

            if (error.value || !data.value) {
                console.error('Errore nel caricamento contatti:', error.value)
                return
            }

            this.whereAreWeTitle = data.value.whereAreWe.title
            this.whereAreWeParagraph = data.value.whereAreWe.paragraph

            this.contactsTitle = data.value.contacts.title
            this.contactsParagraph = data.value.contacts.paragraph

            this.openingHoursTitle = data.value.openingHours.title
            this.openingHoursParagraph = data.value.openingHours.paragraph
        }
    }
})