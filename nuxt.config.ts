export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Sporky",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "it",
      },
      meta: [
        {
          name: "description",
          content: "Get your top tracks from Spotify",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  runtimeConfig: {
    public: {
      clientId: process.env.NUXT_CLIENT_ID,
      redirectUri: `https://${process.env.NUXT_BASE_URL}/api/callback`,
    },
    clientSecret: process.env.NUXT_CLIENT_SECRET,
  },
  ssr: false,
});
