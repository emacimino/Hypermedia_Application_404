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

export interface CV {
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



export const useTeacherIdStore = defineStore('teacherIdPresentation', {
    state: () => ({
        teacher: null as RawTeacher | null,
        cvList: [] as CV[],
    }),
    actions: {
        async fetchTeacher(teacherId: number, supabase: any) {
            const { data, error } = await supabase
                .from('Teachers')
                .select(`*, Events:Events ( * )`)
                .eq('Id', teacherId)
                .single()

            if (!error) {
                this.teacher = data
            } else {
                console.error('fetchTeacher error:', error)
            }
        },

        async fetchCV(teacherId: number, supabase: any) {
            const { data, error } = await supabase
                .from('Teachers_cv')        // 👈 tabella CV come l'hai indicata
                .select('*')
                .eq('TEACHER_ID', teacherId)
                .order('START_DATE', { ascending: false })

            if (!error) {
                this.cvList = data
            } else {
                console.error('fetchCV error:', error)
            }
        }
    },
})
