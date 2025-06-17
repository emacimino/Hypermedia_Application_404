import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

    {
        const {data, error} = await client
            .from<Presentation>('Presentation')
            .select('*')
            .in('Id', [4, 5])

        if (error) {
            console.error('Error fetching presentations:', error)

            throw createError({
                statusCode: 503,
                statusMessage: process.env.NODE_ENV === 'development'
                    ? internalMessage
                    : 'Servizio momentaneamente non disponibile'
            })
        }
        return{
            firstPresentation : data.find(p => p.Id === 4) ?? null,
            secondPresentation : data.find(p => p.Id === 5) ?? null
        }
    }

})