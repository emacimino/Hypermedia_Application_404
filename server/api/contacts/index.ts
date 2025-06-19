import { createClient } from '@supabase/supabase-js'

//Get the contacts presentation content API

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const lang = getQuery(event).lang === 'it' ? 'it' : 'en'

    type PresentationRow = {
        Title?: string
        Title_it?: string
        Paragraph?: string
        Paragraph_it?: string
    }
    const titleCol = lang === 'it' ? 'Title_it' : 'Title'
    const paragraphCol = lang === 'it' ? 'Paragraph_it' : 'Paragraph'

    const client = createClient(
        config.SUPABASE_URL,
        config.SUPABASE_KEY
    )

    async function fetchSection(sectionTitle: string) {
        const { data, error }: { data: PresentationRow | null; error: any } = await client
            .from('Presentation')
            .select(`${titleCol}, ${paragraphCol}`)
            .eq('Title', sectionTitle)
            .single()

        if (!error && data) {
            return {
                title: data[titleCol],
                paragraph: data[paragraphCol]?.replace(/\n/g, '<br>') || ''
            }
        }

        return { title: '', paragraph: '' }
    }

    return {
        whereAreWe: await fetchSection('Where are we?'),
        contacts: await fetchSection('Contacts'),
        openingHours: await fetchSection('Opening Hours')
    }
})