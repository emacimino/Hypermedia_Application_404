import { createClient } from '@supabase/supabase-js'
import type { TimelineItem } from "~/types/models"
//Get the timeline content API, instantiate a supababse config, and get the elements
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const lang = getQuery(event).lang === 'it' ? 'it' : 'en'

    const client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

    const { data, error } = await client
        .from('Timeline')
        .select('*')
        .order('Date', { ascending: true })

    if (error || !data) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to load timeline' })
    }

    const items = data.map((item: TimelineItem) => ({
        Date: item.Date,
        Icon: item.Icon,
        Title: item.Title ?? '',
        Title_it: item.Title_it ?? '',
        Description: item.Description ?? '',
        Description_it: item.Description_it ?? ''
    }))

    return { items }
})
