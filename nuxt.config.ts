import process from 'node:process'

// cross origin isolation is required since oxc-parser uses shared array buffer
const crossOriginHeaders = {
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-monaco-editor',
    '@nuxtjs/plausible',
  ],
  plausible: {
    domain: 'ast-explorer.dev',
    apiHost: 'https://evt.sxzz.dev',
  },
  vite: {
    esbuild: {
      legalComments: 'external',
    },
    resolve: {
      alias: {
        path: 'pathe',
      },
    },
    server: {
      headers: crossOriginHeaders,
    },
  },
  nitro: {
    routeRules: {
      '/**': {
        headers: crossOriginHeaders,
      },
    },
    vercel: {
      config: {
        routes: [
          {
            src: '.*',
            // @ts-expect-error - type dismatch in `nitropack`
            headers: crossOriginHeaders,
          },
        ],
      },
    },
  },
  devtools: {
    enabled: true,
  },
  css: [
    '@unocss/reset/tailwind.css',
    'floating-vue/dist/style.css',
    '~/styles/vars.css',
    '~/styles/global.css',
    '~/styles/dropdown.css',
  ],
  imports: {
    dirs: ['./composables', './parser', './state', './utils'],
  },
  appConfig: {
    branch: process.env.VERCEL_GIT_COMMIT_REF,
  },
  compatibilityDate: '2024-10-10',
})
