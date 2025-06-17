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
        .select('*').
        eq('Id', 2)

    const { data: cardsRaw, error: err2 } = await client
        .from('Teachers')
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
