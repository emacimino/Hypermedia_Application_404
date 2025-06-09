import { useLanguage } from '~/composables/useLanguage'

interface Raw {
    Id: number
    Title: string
}

export const useActivityUrl = () => {
    const { currentLang } = useLanguage()

    const createSlug = (title: string): string => {
        return title
            .toLowerCase()
            .normalize('NFD') // Normalizza caratteri accentati
            .replace(/[\u0300-\u036f]/g, '') // Rimuove accenti
            .replace(/[^a-z0-9\s-]/g, '') // Mantiene solo lettere, numeri, spazi e trattini
            .replace(/\s+/g, '-') // Sostituisce spazi con trattini
            .replace(/-+/g, '-') // Sostituisce trattini multipli con uno singolo
            .replace(/^-|-$/g, '') // Rimuove trattini all'inizio e alla fine
    }

    const createActivityUrl = (activity: Raw): string => {
        const title = activity.Title
        const slug = createSlug(title)
        return `/activityPage/${activity.Id}-${slug}`
    }

    const createTeacherUrl = (teacher: Raw): string => {
        const title = teacher.Title
        const slug = createSlug(title)
        return `/teacherPage/${teacher.Id}-${slug}`
    }

    const extractIdFromSlug = (slug: string): number => {
        if (!slug) return NaN
        const match = slug.toString().match(/^(\d+)/)
        return match ? parseInt(match[1], 10) : NaN
    }

    return {
        createActivityUrl,
        createTeacherUrl,
        extractIdFromSlug,
        createSlug
    }
}