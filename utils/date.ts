export function getWeekDates(base: Date): { start: string; end: string; weekdays: string[] } {
    const start = new Date(base)
    start.setDate(base.getDate() - start.getDay()) // Sunday
    const end = new Date(start)
    end.setDate(start.getDate() + 6)

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const weekDaysInRange = []
    for (let i = 0; i < 7; i++) {
        weekDaysInRange.push(weekdays[(start.getDay() + i) % 7])
    }

    return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
        weekdays: weekDaysInRange,
    }
}
