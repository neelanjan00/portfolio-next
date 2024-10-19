const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '**',
      },
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_USER_ID: process.env.EMAILJS_USER_ID
  }
}

module.exports = nextConfig
