import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/defaultTheme'

const config: Config = {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './node_modules/@nuxthq/ui/dist/**/*.{js,ts,vue}' // 👈 essenziale!
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto-fit': 'repeat(auto-fit, minmax(16rem, 1fr))',
            },
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#1F3A5F', // il tuo colore personalizzato
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a'
                },
                'bg-light': '#f4f4f4'
            },
            spacing: {
                'app-gap': '2rem',
                'app-padding': '2rem',
                'img-height': '12rem'
            },
            borderRadius: {
                card: '0.75rem'
            },
            boxShadow: {
                card: '0 2px 6px rgba(0, 0, 0, 0.1)'
            },
            fontSize: {
                base: '1rem',
                title: '1.25rem'
            }
        }
    },
    plugins: []
}

export default config
