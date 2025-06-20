// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  alias:{
    "@":resolve(__dirname,"."),
    '~': resolve(__dirname, '.'),
  },

  css: [
    "~/assets/main.css",
    'leaflet/dist/leaflet.css'
  ],

  supabase: {
    redirect: false,
  },

  modules: [
    "@nuxt/icon",
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  runtimeConfig: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY
  },
})