const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['res.cloudinary.com'] },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  ...nextConfig,
  i18n,
  async redirects() {
    return [
      process.env.MAINTENANCE_MODE === '1'
        ? {
            source: '/((?!maintenance)(?!_next)(?!images).*)',
            destination: '/maintenance',
            permanent: false,
          }
        : null,
      process.env.MAINTENANCE_MODE === '1'
        ? {
            source: '/',
            destination: '/maintenance',
            permanent: false,
          }
        : null,
      process.env.MAINTENANCE_MODE !== '1'
        ? {
            source: '/maintenance',
            destination: '/',
            permanent: true,
          }
        : null,
      process.env.BUILDING_MODE === '1'
        ? {
            source: '/((?!building)(?!_next)(?!images).*)',
            destination: '/building',
            permanent: false,
          }
        : null,
      ,
      process.env.BUILDING_MODE === '1'
        ? {
            source: '/',
            destination: '/building',
            permanent: false,
          }
        : null,
      process.env.BUILDING_MODE !== '1'
        ? {
            source: '/building',
            destination: '/',
            permanent: false,
          }
        : null,
    ].filter(Boolean);
  },
};
