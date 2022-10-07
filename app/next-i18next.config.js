const path = require('path');
module.exports = {
  i18n: {
    defaultLocale: 'en', //'fr',
    locales: ['en', 'fr'],
    localeDetection: true, //auto-detect the user language
  },
  react: { useSuspense: false },
  fallbackLng: ['en', 'fr'],
  localePath: path.resolve('./public/locales'),
  debug: false, //process.env.NODE_ENV !== "production",
  /**
   * updates to your translation JSON files without having
   * to restart your development server
   */
  reloadOnPrerender: true,
  /**
   * Preload the translations
   */
  ns: ['common'],
};
