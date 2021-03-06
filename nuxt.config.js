import colors from 'vuetify/es5/util/colors'

export default {
    mode: 'universal',
    server: {
        port: 4000
    },
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s - ' + 'Блог Михаила Крамера о программировании на PHP и JS',
        title: '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        "./node_modules/vue-code-highlight/themes/prism.css",
        "./assets/global.scss"
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/axios.js',
        '~/plugins/serviceInstaller.js',
        "~/plugins/vuePlugins.js",
        "~/plugins/ga.js"
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
        ['@nuxtjs/router-extras', { /* module options */ }]
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},

    auth: {
        redirect: {
            login: "/admin/login",
            logout: "/admin/login",
            home: "/admin"
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
                    user: { url: '/profile', method: 'get', propertyName: 'user' }
                },
            }
        }
    },

    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            /* themes: {
               dark: {
                 primary: colors.blue.darken2,
                 accent: colors.grey.darken3,
                 secondary: colors.amber.darken3,
                 info: colors.teal.lighten1,
                 warning: colors.amber.base,
                 error: colors.deepOrange.accent4,
                 success: colors.green.accent3
               }
             }*/
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
