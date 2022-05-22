import i18n from './utils/i18n'
import appConfig from './app.config'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: appConfig.title,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-modal.js',
    '~/plugins/swiper.js',
    '~/plugins/other-libraries.js',
    '~/plugins/socket.client',
    '~/plugins/axios.js',
    { src: '~/plugins/client-libraries', mode: 'client' },
    '~/plugins/tools.js',
    '~/utils/bridge.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
        defaultLocale: 'uz',
        detectBrowserLanguage: false,
        seo: true,
        strategy: 'prefix',
        locales: [
          {
            code: 'en',
            name: 'English',
            iso: 'en'
          },
          {
            code: 'ru',
            name: 'Русский',
            iso: 'ru'
          },
          {
            code: 'uz',
            name: 'Ўзбекча',
            iso: 'uz'
          }
        ],
        vueI18n: i18n
      }
    ],
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios'
  ],

  // Nuxt auth
  auth: {
    localStorage: false,
    cookie: {
      expires: 7
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          maxAge: 30 * 24 * 60 * 60,
          global: true,
          type: 'Bearer'
        },
        // user: {
        //   property: 'user',
        //   autoFetch: true
        // },
        endpoints: {
          login: { url: '/auth/local', method: 'post' },
          // refresh: { url: '/auth/token/refresh', method: 'post' },
          user: false,
          logout: false
          // tokenRequired: true,
          // tokenType: 'Bearer',
          // facebook: {
          //   client_id: 'your facebook app id',
          //   userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email',
          //   scope: ['public_profile', 'email']
          // },
          // google: { client_id: 'your gcloud oauth app client id' }
        },
        redirect: {
          login: '/',
          logout: '/',
          user: '/profile',
          callback: '/'
        }
      }
    }
  },

  env: {
    // baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:3000',
    WS_URL: process.env.WS_URL || 'http://localhost:3000'
  },
  axios: {
    baseURL: 'http://localhost:4000' // Used as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    axios: {
      // baseURL:
      //   process.env.NODE === 'production'
      //     ? process.env.VUE_APP_BASE_URL
      //     : process.env.VUE_APP_BASE_URL
      baseURL:
        process.env.NODE === 'production'
          ? 'https://admin.agsat.uz/'
          : 'https://admin.agsat.uz/'
    }
  },

  router: {
    // mode: 'hash',
    middleware: ['auth'],
    prefetchLinks: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  }
}
