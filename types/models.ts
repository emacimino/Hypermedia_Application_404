export interface EventItem {
    ID: number
    Title: string
    Description?: string
    Location?: string
    Type: 'onetime' | 'recurring'
    Date?: string
    Weekday?: number
    StartTime: string
    EndTime: string
    Image?: string
    CourseId?: number
    TeacherId?: number
}