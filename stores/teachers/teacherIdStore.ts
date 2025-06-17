import { defineStore } from 'pinia'

interface RawTeacher {
    Id: number
    Title_it: string
    Title: string
    LongDescription_it: string
    LongDescription: string
    Image: string
    Events?: any[]
    LED_ACTIVITIES?: { Id: number, Title: string, Title_it: string }[]
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
    IS_LEADER: boolean
}

export const useTeacherIdStore = defineStore('teacherIdPresentation', {
    state: () => ({
        teacher: null as RawTeacher | null,
        cvList: [] as CV[],
    }),
    actions: {
        async fetchTeacher(teacherId: number) {
            const { data, error } = await useFetch<{
                teacher: RawTeacher | null
                cvList: CV[]
                ledActivities: { Id: number; Title: string; Title_it: string }[]
            }>(`/api/teachers/id?id=${teacherId}`)

            if (error.value || !data.value || !data.value.teacher) {
                console.error('Errore nel caricamento insegnante:', error.value)
                this.teacher = null
                this.cvList = []
                return
            }

            this.teacher = data.value.teacher
            this.cvList = data.value.cvList
            this.teacher.LED_ACTIVITIES = data.value.ledActivities
        },
    },
})
