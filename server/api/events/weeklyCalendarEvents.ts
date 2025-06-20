import { createClient } from '@supabase/supabase-js'
import { getQuery } from 'h3'
import { getWeekDates } from '~/utils/date'


//Get the events presentation content API for Calendar

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

    const query = getQuery(event)
    const baseDate = query.base ? new Date(query.base.toString()) : new Date()
    const { start: from, end: to, weekdays } = getWeekDates(baseDate)
    const { data: onetimeEvents, error: oneErr } = await client
        .from("Events")
        .select("*")
        .eq("Type", "onetime")
        .gte("Date", from)
        .lte("Date", to)

    const { data: recurringEvents, error: recErr } = await client
        .from("Events")
        .select("*")
        .eq("Type", "recurring")
        .in("Weekday", weekdays)

    if (oneErr || recErr) {
        console.error('Errore Supabase:', oneErr ?? recErr)
        return { weeklyEvents: [] }
    }

    return {
        weeklyEvents: [...(onetimeEvents ?? []), ...(recurringEvents ?? [])]
    }
})
