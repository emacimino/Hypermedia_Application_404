import { defineStore } from 'pinia'

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
        getColumnName(base: string, lang: string) {
            return lang === 'it' ? `${base}_it` : base
        },

        async fetchSection(title: string, lang: string, supabase: any) {
            const titleCol = this.getColumnName('Title', lang)
            const paragraphCol = this.getColumnName('Paragraph', lang)

            const { data, error } = await supabase
                .from('Presentation')
                .select(`${titleCol}, ${paragraphCol}`)
                .eq('Title', title)
                .single()

            if (!error && data) {
                return {
                    title: data[titleCol],
                    paragraph: (data[paragraphCol] as string).replace(/\n/g, '<br>'),
                }
            }

            return { title: '', paragraph: '' }
        },

        async fetchAllContent(supabase: any, lang: string) {
            const where = await this.fetchSection('Where are we?', lang, supabase)
            const contacts = await this.fetchSection('Contacts', lang, supabase)
            const hours = await this.fetchSection('Opening Hours', lang, supabase)

            this.whereAreWeTitle = where.title
            this.whereAreWeParagraph = where.paragraph

            this.contactsTitle = contacts.title
            this.contactsParagraph = contacts.paragraph

            this.openingHoursTitle = hours.title
            this.openingHoursParagraph = hours.paragraph
        }
    }
})
