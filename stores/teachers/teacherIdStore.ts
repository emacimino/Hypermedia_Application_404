import { defineStore } from 'pinia'
import type { RawTeacher } from '~/types/models'
import type { CV } from '~/types/models'

//Map the tacher taken from DB to the correct interface used
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
