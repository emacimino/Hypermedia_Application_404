// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  alias:{
    "@":resolve(__dirname,"."),
  },

  css: [
    "~/assets/main.css"
    /*'leaflet/dist/leaflet.css'*/
  ],

  supabase: {
    redirect: false,
  },

  modules: ["@nuxt/icon",'@nuxtjs/supabase'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  }
})