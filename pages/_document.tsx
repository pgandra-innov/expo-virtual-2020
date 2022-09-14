import Document, { Html, Head, Main, NextScript } from 'next/document'
import { isProduction } from '../data/isProduction'

// TODO: enable chat script
class MyDocument extends Document {
  render (): JSX.Element {
    return (
      <Html>
        <Head>
          <script src='/scripts/tm_h.js'></script>
          <script src='/scripts/hotjar.js'></script>
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript><iframe src='https://www.googletagmanager.com/ns.html?id=GTM-NCM5WX5'
          height='0' width='0' style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
          {
            isProduction &&
              <script src='//code.tidio.co/tg1xni1clidofgtxfydcl5uyna4xll33.js' async />
          }
        </body>
      </Html>
    )
  }
}

export default MyDocument
