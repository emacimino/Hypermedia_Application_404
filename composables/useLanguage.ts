import { useState } from '#app'
import { onMounted } from 'vue'
import en from '~/locales/en'
import it from '~/locales/it'

const translations = { en, it }

export function useLanguage() {
    const currentLang = useState<'en' | 'it'>('language', () => 'en')

    const t = (path: string): string => {
        const keys = path.split('.')
        return keys.reduce((obj: any, key) => obj?.[key], translations[currentLang.value]) || path
    }

    const toggleLanguage = () => {
        currentLang.value = currentLang.value === 'en' ? 'it' : 'en'
        localStorage.setItem('language', currentLang.value)
    }

    onMounted(() => {
        const saved = localStorage.getItem('language')
        if (saved === 'en' || saved === 'it') {
            currentLang.value = saved
        }
    })

    return { currentLang, t, toggleLanguage }
}
