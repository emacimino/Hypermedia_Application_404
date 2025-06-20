// Reusable interface for localized titles
export interface LocalizedTitle {
    Title: string
    Title_it: string
}

// Reusable interface for localized paragraphs
export interface LocalizedParagraph {
    Paragraph: string
    Paragraph_it: string
}

// Full presentation object with localized title and paragraph
export interface PresentationContent extends LocalizedTitle, LocalizedParagraph {
    Id: number
    Image: string
}

// Presentation data without the Id
export type RawPresentation = Omit<PresentationContent, 'Id'>

// Lightweight version of presentation content, used for display-only purposes
export type PresentationItem = Pick<PresentationContent, 'Title' | 'Paragraph' | 'Image'>

// Data model for an activity, such as a course or event
export interface RawActivity extends LocalizedTitle {
    Id: number
    ShortDescription: string
    ShortDescription_it: string
    Image: string
    Link: string
}

// Highlighted content for homepage or featured sections
export interface HighlightItem {
    id: number
    title: { en: string; it: string }
    subtitle: { en: string; it: string }
    image: string
}

// Slide item for a slideshow or image carousel
export interface Slide {
    Title: string
    ImageUrl: string
    Course_Id: number
}

// Event model, representing scheduled occurrences of an activity
export interface EventItem {
    Id: number
    StartDate: string
    EndDate: string
    ActivityId: number
    TeacherId: number
    Type?: 'onetime' | 'recurring'
    Weekday?: string
    Date?: string
}

// Timeline model, representing the timeline in about us
export interface TimelineItem {
    Date: string
    Icon: string
    Title: string
    Title_it: string
    Description: string
    Description_it: string
}

// Represents a simplified view of an event, typically used for activity listings
export interface DisplayEventItem {
    Id: number
    Course_id: number
    Date?: string
    Type?: string
    Teacher_name?: string
}

// Represents an activity with localized titles and descriptions, plus linked events and leader
export interface ActivityDetails {
    Id: number
    Title: string
    Title_it: string
    LongDescription: string
    LongDescription_it: string
    Image: string
    Events?: DisplayEventItem[]
    Course_leader?: {
        Id: number
        Title: string
    }
}

export interface SponsorHighlight {
    Id: number
    Sponsor_title: string | null
    Sponsor_title_it: string | null
    Sponsor_paragraph: string | null
    Sponsor_paragraph_it: string | null
    Image: string
}

// Slide with course reference
export interface Slide {
    Title: string
    ImageUrl: string
    Course_Id: number
}

// Full teacher profile with events and activities
export interface RawTeacher {
    Id: number
    Title_it: string
    Title: string
    LongDescription_it: string
    LongDescription: string
    Image: string
    Events?: any[]
    LED_ACTIVITIES?: { Id: number, Title: string, Title_it: string }[]
}

// Lightweight version of a teacher, used in card components
export interface TeacherCard extends LocalizedTitle {
    Id: number
    Image: string
    Link: string
    ShortDescription: string
    ShortDescription_it: string
}

// Curriculum Vitae entry for a teacher
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
export interface SubscriptionItem{
    first_name: string
    last_name: string
    email: string
    message: string
    type: string
}