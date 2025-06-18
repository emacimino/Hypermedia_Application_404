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

// Presentation data without the Id, typically used for creation or drafts
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
    title: { en: string; it: string }
    subtitle: { en: string; it: string }
    image: string
}

// Slide item for a slideshow or image carousel
export interface Slide {
    Url: string
    Position: number
}

// Event model, representing scheduled occurrences of an activity
export interface EventItem {
    Id: number
    StartDate: string
    EndDate: string
    ActivityId: number
    TeacherId: number
}
