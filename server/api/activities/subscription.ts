import { createClient } from '@supabase/supabase-js'
//Post to insert in supabase data from subscription

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = createClient(
        config.SUPABASE_URL,
        config.SUPABASE_KEY
    )

    if (event.method === 'POST') {
        const body = await readBody(event)

        const { error } = await client
            .from('Subscription')
            .insert([{
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                message: body.message,
                type: body.type
            }])

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    }

    if (event.method === 'GET') {
        const { data, error } = await client
            .from('Subscription')
            .select('*')

        if (error) {
            return { success: false, error: error.message }
        }

        return { items: data }
    }

    return { success: false, error: 'Invalid method' }
})
