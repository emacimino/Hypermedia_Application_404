//manage the creation of the URL for the activity and teacher
interface Raw {
    Id: number
    Title: string
}

export const useUrl = () => {

    const createSlug = (title: string): string => {
        return title
            .toLowerCase()
            .normalize('NFD') // Normalise accented characters
            .replace(/[\u0300-\u036f]/g, '') // Removes accents
            .replace(/[^a-z0-9\s-]/g, '') // Retains only letters, numbers, spaces and hyphens
            .replace(/\s+/g, '-') // Replaces spaces with dashes
            .replace(/-+/g, '-') // Replaces multiple hyphens with a single one
            .replace(/^-|-$/g, '') // Removes hyphens at the beginning and end
    }

    const createActivityUrl = (activity: Raw): string => {
        const title = activity.Title
        const slug = createSlug(title)
        return `/activities/${activity.Id}-${slug}`
    }

    const createTeacherUrl = (teacher: Raw): string => {
        const title = teacher.Title
        const slug = createSlug(title)
        return `/teachers/${teacher.Id}-${slug}`
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