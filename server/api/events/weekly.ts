import { getQuery } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { getWeekDates } from '~/utils/date'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

    const base = getQuery(event).base
    const baseDate = base ? new Date(base.toString()) : new Date()
    const { start, end, weekdays } = getWeekDates(baseDate)

    const { data: onetimeEvents, error: err1 } = await client
        .from('Events')
        .select('*')
        .eq('Type', 'onetime')
        .gte('Date', start)
        .lte('Date', end)

    const { data: recurringEvents, error: err2 } = await client
        .from('Events')
        .select('*')
        .eq('Type', 'recurring')
        .in('Weekday', weekdays)

    if (err1 || err2) {
        console.error('Supabase errors:', err1 ?? err2)
        return { weeklyEvents: [] }
    }

    return {
        weeklyEvents: [...(onetimeEvents ?? []), ...(recurringEvents ?? [])],
    }
})
