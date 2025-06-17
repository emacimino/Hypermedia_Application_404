import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    const client = createClient(
        config.SUPABASE_URL,
        config.SUPABASE_KEY
    )

    const { data: content1, error: error1 } = await client
        .from('Presentation')
        .select('*')
        .eq('Id', 3)
        .single()

    const { data: content2, error: error2 } = await client
        .from('Presentation')
        .select('*')
        .eq('Id', 10)
        .single()

    if (error1 || error2) {
        console.error('Errore nel caricamento About Us:', error1 || error2)
        return {
            content: null,
            content2: null
        }
    }

    return {
        content: content1,
        content2: content2
    }
})