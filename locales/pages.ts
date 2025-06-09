export const pageTitles = {
    index: {
        it: 'White Lotus – Benvenuti',
        en: 'White Lotus – Welcome'
    },
    aboutUs: {
        it: 'Chi siamo – White Lotus',
        en: 'About Us – White Lotus'
    },
    contacts: {
        it: 'Contatti – White Lotus',
        en: 'Contacts – White Lotus'
    },
    highlights: {
        it: 'Eventi e novità – White Lotus',
        en: 'Highlights – White Lotus'
    },
    teacherPage: {
        it: 'I nostri insegnanti – White Lotus',
        en: 'Our Teachers – White Lotus'
    },
    activityPage: {
        it: 'Attività – White Lotus',
        en: 'Activities – White Lotus'
    },
    dynamicTeacher: (name: string, lang: string) =>
        lang === 'it' ? `Insegnante: ${name} – White Lotus` : `Teacher: ${name} – White Lotus`,
    dynamicActivity: (title: string, lang: string) =>
        lang === 'it' ? `Attività: ${title} – White Lotus` : `Activity: ${title} – White Lotus`,
}
