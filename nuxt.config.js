import { markdown } from 'markdown'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base: process.env.BASE_URL
  },

  publicRuntimeConfig: {
    URL: process.env.URL,
    BLOG_FEED_URL: process.env.BLOG_FEED_URL,
    SOURCE_CODE_URL: process.env.SOURCE_CODE_URL,
    BLOG_TITLE: process.env.BLOG_TITLE,
    BLOG_DESCRIPTION: process.env.BLOG_DESCRIPTION,
    PERSONAL_GIT: process.env.PERSONAL_GIT
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.BLOG_TITLE,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.BLOG_DESCRIPTION },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@aceforth/nuxt-optimized-images',
    'nuxt-compress'
  ],

  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: false
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/feed',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    gzip: true,
    hostname: process.env.URL
  },

  feed () {
    const baseUrlArticles = process.env.URL
    const baseLinkFeedArticles = `/${process.env.BLOG_FEED_URL}/`
    const feedFormats = {
      rss: { type: 'rss2', file: 'rss.xml' },
      json: { type: 'json1', file: 'feed.json' }
    }
    const { $content } = require('@nuxt/content')

    const createFeedArticles = async function (feed) {
      feed.options = {
        title: process.env.BLOG_TITLE,
        description: process.env.BLOG_DESCRIPTION,
        link: baseUrlArticles
      }
      const articles = await $content('articles', { text: true }).fetch()
      articles.forEach((article) => {
        const convertedText = markdown.toHTML(article.text)
        const url = `${baseUrlArticles}/${article.slug}`
        feed.addItem({
          title: article.title,
          id: url,
          date: article.published,
          description: article.description,
          content: convertedText,
          author: article.authors
        })
      })
    }

    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `${baseLinkFeedArticles}/${file}`,
      type,
      create: createFeedArticles
    }))
  },

  content: {
    markdown: {
      prism: {
        theme: 'assets/styles/prism-theme.css'
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
