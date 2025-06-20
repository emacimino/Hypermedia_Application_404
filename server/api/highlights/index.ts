import { createClient } from '@supabase/supabase-js'
import type { SponsorHighlight, HighlightItem, LocalizedTitle } from '~/types/models'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const lang = getQuery(event).lang === 'it' ? 'it' : 'en'

    const client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

    // Fetch highlights from Activities table and map the used interfaces
    const { data: activityData, error: activityError } = await client
        .from('Activities')
        .select(`
      Id,
      Sponsor_title,
      Sponsor_paragraph,
      Sponsor_title_it,
      Sponsor_paragraph_it,
      Image
    `)
        .not('Sponsor_title', 'is', null)
        .order('Id', { ascending: true })

    if (activityError || !activityData) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to load highlights' })
    }

    const titleCol = lang === 'it' ? 'Sponsor_title_it' : 'Sponsor_title'
    const subtitleCol = lang === 'it' ? 'Sponsor_paragraph_it' : 'Sponsor_paragraph'

    const highlights: HighlightItem[] = (activityData as SponsorHighlight[]).map(item => ({
        id: item.Id,
        title: {
            en: item.Sponsor_title ?? '',
            it: item.Sponsor_title_it ?? ''
        },
        subtitle: {
            en: item.Sponsor_paragraph ?? '',
            it: item.Sponsor_paragraph_it ?? ''
        },
        image: item.Image
    }))


    // Fetch title from Presentation where Id = 14
    const { data: presentationData, error: presentationError } = await client
        .from('Presentation')
        .select(`
      Title,
      Title_it
    `)
        .eq('Id', 14)
        .single()

    if (presentationError || !presentationData) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to load highlight title' })
    }

    const title: LocalizedTitle = {
        Title: presentationData.Title ?? '',
        Title_it: presentationData.Title_it ?? ''
    }

    return { highlights, title }
})
