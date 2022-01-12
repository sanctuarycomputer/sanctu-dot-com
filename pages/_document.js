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
          <meta charset="utf-8" />
          <link rel="shortcut icon" href="favicon-16x16.png" />
          <link rel="shortcut icon" href="favicon-32x32.png" />
          <meta name="theme-color" content="#000000" />
          <link rel="stylesheet" type="text/css" href="https://fonts.sanctuary.computer/AustinNewsDeck/styles.css" />
          <link rel="stylesheet" type="text/css" href="https://fonts.sanctuary.computer/AtlasGrotesk/styles.css" />
          <link async defer rel="stylesheet" type="text/css" href="clippyjs/build/clippy.css" media="all" />

          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-88778470-4"></script>
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
          <script async defer src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
          <script async defer src="%PUBLIC_URL%/assets/clippyjs/build/clippy.min.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument