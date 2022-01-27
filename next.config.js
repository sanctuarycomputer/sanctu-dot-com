const path = require('path')
BasementExtractor = (content) => content.match(/[A-Za-z0-9-_:\/]+/g) || [];

module.exports = {
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  basePath: "",
  env: {
    REACT_APP_CONTENTFUL_SPACE_ID: 'zb716c7gdesq',
    REACT_APP_CONTENTFUL_HOST: 'cdn.contentful.com',
    REACT_APP_CONTENTFUL_ACCESS_TOKEN: '2a9914f1877f6376b17edacff808455173922e80c2b9c63895407209b46c8b10',
  },
  images: {
    domains: ['images.ctfassets.net'],
    deviceSizes: [375, 414, 520, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 416, 512, 576, 620, 700, 760, 800, 832, 1024, 1152, 995, 1990],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}'
        ],
        css: ['./styles/**/*.{scss,css}'],
        extractors: [
          {
            extractor: BasementExtractor,
            extensions: ['scss','css']
          }
        ],
        safelist: ["html", "body"]
      }
    ],
  ]
}