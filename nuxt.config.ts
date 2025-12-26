// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "nuxt-gtag", "nuxt-auth-utils"],
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
  runtimeConfig: {
    public: {
      adminRole: process.env.NUXT_PUBLIC_OAUTH_KEYCLOAK_ADMIN_ROLE
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
      ],
      meta: [
        {
          property: "og:title",
          content: "Rudy Dupuis - Concepteur développeur d'applications"
        },
        {
          property: "og:description",
          content:
            "Je suis Rudy Dupuis, un Concepteur développeur d'applications passionné par l'UX. J'ai fusionné ma passion pour le bricolage et le numérique dans la conception de ce site. Découvrez mon parcours et mes compétences. Contactez-moi pour discuter de votre projet numérique."
        },
        {
          property: "og:image",
          content: "https://rd-tech.fr/open-graph.png"
        },
        {
          property: "og:url",
          content: "https://rd-tech.fr"
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:site_name",
          content: "RD-Tech"
        }
      ]
    }
  }
});
