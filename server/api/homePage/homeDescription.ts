import { createClient } from '@supabase/supabase-js'
import type { Presentation } from '~/types/models'
//Get the content for home presentation data and map to the used data

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

    const { data, error } = await client
        .from('Presentation')
        .select('*')
        .in('Id', [4, 5])

    const typedData = data as Presentation[]

    if (error) {
        throw createError({
            statusCode: 503,
            statusMessage: process.env.NODE_ENV === 'development'
                ? error.message
                : 'Servizio momentaneamente non disponibile'
        })
    }

    return {
        firstPresentation: typedData.find(p => p.Id === 4) ?? null,
        secondPresentation: typedData.find(p => p.Id === 5) ?? null
    }
})
