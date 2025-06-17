import { createClient } from '@supabase/supabase-js'
import { getQuery } from 'h3'
import dayjs from 'dayjs'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

    const query = getQuery(event)
    const baseDate = query.base ? dayjs(query.base as string) : dayjs()

    const startOfWeek = baseDate.startOf('isoWeek')
    const endOfWeek = baseDate.endOf('isoWeek')
    const from = startOfWeek.format("YYYY-MM-DD")
    const to = endOfWeek.format("YYYY-MM-DD")
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

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
