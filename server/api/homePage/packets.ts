import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

    const lang = getQuery(event).lang || 'en'

    const { data, error } = await client
        .from('Packets')
        .select('Id, Price, Duration, Duration_it, Color')

    if (error || !data) {
        console.error('⚠️ Supabase error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Errore caricamento pacchetti' })
    }

    return {
        packets: data.map(p => ({
            id: String(p.Id),
            price: p.Price,
            duration: lang === 'it' ? p.Duration_it : p.Duration,
            color: p.Color
        }))
    }
})