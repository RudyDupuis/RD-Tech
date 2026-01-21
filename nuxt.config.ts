// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "nuxt-gtag"],
  vite: {
    plugins: [tailwindcss()]
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],
  imports: {
    dirs: ["utils/**", "../utils/**"]
  },
  nitro: {
    imports: {
      dirs: ["utils/**", "server/utils/**"]
    }
  },
  gtag: {
    initMode: "manual",
    id: "G-VSNBTJ5G4B"
  },
  app: {
    head: {
      script: [
        {
          src: "https://kit.fontawesome.com/49aa64a243.js",
          crossorigin: "anonymous"
        }
      ]
    }
  }
});
