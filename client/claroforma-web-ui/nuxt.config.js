module.exports = {
  env: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'claroforma-web-ui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Claroforma Web UI with Vue+Nuxt' }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.2.1.min.js' },
      { src: '/semantic/dist/semantic.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/semantic/dist/semantic.min.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/reset.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/site.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/container.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/grid.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/image.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/menu.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/divider.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/list.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/segment.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/dropdown.css' },
      { rel: 'stylesheet', href: '/semantic/dist/components/icon.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
