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
          <NextScript async rel="preconnect" type="text/javascript" src="https://www.google-analytics.com/analytics.js"></NextScript>
          <NextScript async rel="prefetch" src="https://www.googletagmanager.com/gtag/js?id=UA-88778470-4"></NextScript>
          <NextScript
            defer
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
        </body>
      </Html>
    )
  }
}

export default MyDocument