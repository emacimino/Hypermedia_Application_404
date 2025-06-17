import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const client = createClient(
        config.SUPABASE_URL,
        config.SUPABASE_KEY
    )

    const teacherId = Number(getQuery(event).id)

    if (isNaN(teacherId)) {
        return { teacher: null, cvList: [], ledActivities: [] }
    }

    const { data: teacherData, error: teacherError } = await client
        .from('Teachers')
        .select(`*, Events:Events(*)`)
        .eq('Id', teacherId)
        .single()

    if (teacherError || !teacherData) {
        console.error('Errore nel caricamento insegnante:', teacherError)
        return { teacher: null, cvList: [], ledActivities: [] }
    }

    const { data: cvData, error: cvError } = await client
        .from('Teachers_cv')
        .select('*')
        .eq('TEACHER_ID', teacherId)
        .order('START_DATE', { ascending: false })

    if (cvError) {
        console.error('Errore nel caricamento CV:', cvError)
    }

    const { data: ledActivitiesData, error: ledError } = await client
        .from('Activities')
        .select('Id, Title, Title_it')
        .eq('Course_leader', teacherId)

    if (ledError) {
        console.error('Errore nel caricamento attività guidate:', ledError)
    }

    return {
        teacher: teacherData,
        cvList: cvData || [],
        ledActivities: ledActivitiesData || []
    }
})
