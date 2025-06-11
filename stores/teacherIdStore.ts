import { defineStore } from 'pinia'
interface RawTeacher {
    Id: number
    Title_it: string
    Title: string
    LongDescription_it: string
    LongDescription: string
    Image: string
    Events?: any[]
}

interface CV {
    ID: number
    TEACHER_ID: number
    TITLE: string
    TITLE_it: string
    DESCRIPTION: string
    DESCRIPTION_it: string
    START_DATE: string
    END_DATE: string
    LOCATION: string
    LOCATION_it: string
    CREATED_AT: string
}

interface EventItem {
    Id: number
    Course_id: number
    Date?: string
    Type?: string
    Teacher_name?: string
}

interface RawActivity {
    Id: number
    Title: string
    Title_it: string
    LongDescription: string
    LongDescription_it: string
    Image: string
    Events?: EventItem[]
}

export const useTeacherIdStore = defineStore('teacherIdPresentation', {
    state: () => ({
        teacher: null as RawTeacher | null,
    }),
    actions: {
        async fetchTeacher(teacherId: number, supabase: any) {
            if (isNaN(teacherId)) return

            const { data, error } = await supabase
                .from("Teachers")
                .select(`*, Events:Events ( * )`)
                .eq("Id", teacherId)
                .single()


            if (error || !data) {
                console.error('Errore nel caricamento attività:', error)
                this.teacher = null
                return
            }

            this.teacher = data
        }
    }
})
