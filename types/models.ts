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

export interface Presentation {
    Id: number
    Title: string
    Title_it: string
    Paragraph: string
    Paragraph_it: string
    Image: string
}

export interface HighlightItem {
    id: number
    title: { en: string; it: string }
    subtitle: { en: string; it: string }
    link: string
}

export interface Title {
    Title: string
    Title_it: string
}

export interface RawActivity {
    Id: number
    Image: string
    Link: string
    Title: string
    Title_it: string
    ShortDescription_it: string
    ShortDescription: string
}

export interface RawPresentation {
    Title: string
    Title_it: string
    Paragraph: string
    Paragraph_it: string
    Image: string
}

export interface PresentationItem {
    Title: string
    Paragraph: string
    Image: string
}

export interface PresentationContent {
    Id: number
    Title: string
    Paragraph: string
    Image: string
    Title_it: string
    Paragraph_it: string
}
 export interface Slide {
     Title: string
     ImageUrl: string
     Course_Id: number
 }