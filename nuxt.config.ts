// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  alias:{
    "@":resolve(__dirname,"."),
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
  ],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
})