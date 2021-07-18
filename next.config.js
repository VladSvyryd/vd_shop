const withImages = require('next-images')
module.exports = withImages({
  images: {
    domains: ['source.unsplash.com'],
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'fr', 'de'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
    localeDetection: false
  }
})
