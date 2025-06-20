export function getWeekDates(base: Date): { start: string; end: string; weekdays: string[] } {
    const start = new Date(base)
    const day = start.getDay() || 7 // Sunday = 7
    start.setDate(base.getDate() - day + 1) // Monday

    const end = new Date(start)
    end.setDate(start.getDate() + 6) // Sunday

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
        weekdays
    }
}
