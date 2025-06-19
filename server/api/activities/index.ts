import { createClient } from '@supabase/supabase-js'

//Get the group activity content API
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = createClient(
        config.SUPABASE_URL,
        config.SUPABASE_KEY
    )
    const { data: presRaw, error: err1 } = await client
        .from('Presentation')
        .select('*')
        .eq('Id', 6)

    const { data: cardsRaw, error: err2 } = await client
        .from('Activities')
        .select('*')

    if (err1 || err2) {
        const internalMessage = err1?.message || err2?.message || 'Unknown error'
        console.error('Supabase error:', internalMessage)

        throw createError({
            statusCode: 503,
            statusMessage: process.env.NODE_ENV === 'development'
                ? internalMessage
                : 'Servizio momentaneamente non disponibile'
        })
    }

    return {
        presRaw,
        cardsRaw,
    }
})
