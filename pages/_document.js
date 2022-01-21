import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="favicon-16x16.png" />
          <link rel="shortcut icon" href="favicon-32x32.png" />
          <meta name="theme-color" content="#000000" />
          <script async rel="dns-prefetch" src="https://www.googletagmanager.com/gtag/js?id=UA-88778470-4"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
  
              gtag('config', 'UA-88778470-4');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <link defer rel="dns-prefetch" href="https://fonts.sanctuary.computer" />
          <link defer rel="stylesheet" type="text/css" href="https://fonts.sanctuary.computer/AustinNewsDeck/styles.css?display=swap" />
          <link defer rel="stylesheet" type="text/css" href="https://fonts.sanctuary.computer/AtlasGrotesk/styles.css?display=swap" />
          <link defer rel="stylesheet" type="text/css" href="clippyjs/build/clippy.css" />
          <link defer rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pace-js@latest/pace-theme-default.min.css" />
          <script defer rel="dns-prefetch" src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossOrigin="anonymous"></script>
          <script defer rel="dns-prefetch" src="clippyjs/build/clippy.min.js"></script>
          <script defer rel="dns-prefetch" src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument