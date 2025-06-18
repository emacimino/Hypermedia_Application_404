// ~/composables/useLanguage.ts
import { ref, computed } from 'vue'
import en from '~/locales/en'
import it from '~/locales/it'

// Global reactive state (shared across components)
const currentLanguage = ref<'en' | 'it'>('en')

const translations = {
    en,
    it
}

const t = computed(() => translations[currentLanguage.value])

const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'en' ? 'it' : 'en'
}

export const useLanguage = () => {
    return {
        t,
        toggleLanguage,
        currentLang: currentLanguage
    }
}
