import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './node_modules/@nuxthq/ui/dist/**/*.{js,ts,vue}'

    ],
    theme: {
        extend: {
            screens: {
                'xl1440': '1440px',
            },
            gridTemplateColumns: {
                'auto-fit': 'repeat(auto-fit, minmax(16rem, 1fr))',
            },
            colors: {
                brand: {
                    50: '#eff6ff',
                    100: '#d0f0fd',
                    200: '#bfdbfe',
                    300: '#0077b6',
                    400: '#005a8b',
                    500: '#1F3A5F',
                    600: '#1F3A5F',
                    700: '#005a8b',
                    800: '#1e40af',
                    900: '#1e3a8a'

                },
                'bg-light': '#f4f4f4',

                appBar: '#d0f0fd'
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
                card: '0 2px 6px rgba(0, 0, 0, 0.1)',
            },
            fontSize: {
                base: '1rem',
                title: '1.25rem'
            },
            fontFamily: {
                playfair: ['"Playfair Display"', 'serif'],
            }

        }
    },
    plugins: []
}

export default config
