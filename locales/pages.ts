export const pageMeta = {
    index: {
        title: {
            it: 'White Lotus – Benvenuti',
            en: 'White Lotus – Welcome'
        },
        description: {
            it: 'Scopri il centro White Lotus, un luogo dove corpo e mente si incontrano per il tuo benessere.',
            en: 'Discover White Lotus, a center where body and mind meet for your well-being.'
        }
    },
    aboutUs: {
        title: {
            it: 'Chi siamo – White Lotus',
            en: 'About Us – White Lotus'
        },
        description: {
            it: 'Conosci la storia, i valori e la missione del centro White Lotus.',
            en: 'Learn about the story, values, and mission of White Lotus.'
        }
    },
    contacts: {
        title: {
            it: 'Contatti – White Lotus',
            en: 'Contacts – White Lotus'
        },
        description: {
            it: 'Contatta il centro White Lotus per informazioni, prenotazioni o collaborazioni.',
            en: 'Contact White Lotus for info, bookings or collaborations.'
        }
    },
    highlights: {
        title: {
            it: 'Eventi e novità – White Lotus',
            en: 'Highlights – White Lotus'
        },
        description: {
            it: 'Scopri gli ultimi eventi, novità e iniziative del centro White Lotus.',
            en: 'Discover the latest events, news, and initiatives from White Lotus.'
        }
    },
    teacherPage: {
        title: {
            it: 'I nostri insegnanti – White Lotus',
            en: 'Our Teachers – White Lotus'
        },
        description: {
            it: 'Incontra gli insegnanti del centro White Lotus e scopri le loro competenze.',
            en: 'Meet the teachers of White Lotus and learn about their expertise.'
        }
    },
    activityPage: {
        title: {
            it: 'Attività – White Lotus',
            en: 'Activities – White Lotus'
        },
        description: {
            it: 'Esplora tutte le attività offerte dal centro White Lotus.',
            en: 'Explore all the activities offered by White Lotus.'
        }
    },
    dynamicTeacher: (name: string, lang: string) => ({
        title: lang === 'it' ? `Insegnante: ${name} – White Lotus` : `Teacher: ${name} – White Lotus`,
        description: lang === 'it'
            ? `Scopri il profilo dell’insegnante ${name} e il suo percorso nel centro White Lotus.`
            : `Discover the profile of teacher ${name} and their journey at White Lotus.`
    }),
    dynamicActivity: (title: string, lang: string) => ({
        title: lang === 'it' ? `Attività: ${title} – White Lotus` : `Activity: ${title} – White Lotus`,
        description: lang === 'it'
            ? `Tutti i dettagli sull’attività "${title}" offerta dal centro White Lotus.`
            : `All details about the activity "${title}" offered by White Lotus.`
    }),
};
