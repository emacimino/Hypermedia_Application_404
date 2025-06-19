import { createClient } from '@supabase/supabase-js'
import type { Slide } from '~/types/models'

//Get from the database the slideshow items
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const lang = getQuery(event).lang === 'it' ? 'it' : 'en' // Future-proof, even if not used now

    const client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

    const { data, error } = await client
        .from('Slideshow')
        .select('Title, ImageUrl, Course_Id')

    if (error || !data) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to load slideshow data' })
    }

    const slides: Slide[] = data.map(item => ({
        Title: item.Title,
        ImageUrl: item.ImageUrl,
        Course_Id: item.Course_Id
    }))

    return { slides }
})
