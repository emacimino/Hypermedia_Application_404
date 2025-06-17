import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    console.log('SUPABASE_URL:', config.SUPABASE_URL)
    console.log('SUPABASE_KEY:', config.SUPABASE_KEY)
    const client = createClient(
        config.SUPABASE_URL,
        config.SUPABASE_KEY
    )
    const activityId = Number(getQuery(event).id)

    if (isNaN(activityId)) {
        return { activity: null }
    }

        const { data, error } = await client
            .from("Activities")
            .select(`*, Events:Events(*), Course_leader:Teachers(Id, Title)`)
            .eq("Id", activityId)
            .single()

        if (error || !data) {
            console.error('Errore nel caricamento attività:', error)
            return { activity: null }
        }
    return {
        activity: data
    }


})
