import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    console.log('SUPABASE_URL:', config.SUPABASE_URL)
    console.log('SUPABASE_KEY:', config.SUPABASE_KEY)
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
        console.error('Supabase error:', err1 || err2)
        throw createError({
            statusCode: 500,
            statusMessage: err1?.message || err2?.message || 'Unknown error'
        },
            {
            statusCode: 503,
            statusMessage: 'Servizio momentaneamente non disponibile'
        })
    }

    return {
        presRaw,
        cardsRaw,
    }
})
