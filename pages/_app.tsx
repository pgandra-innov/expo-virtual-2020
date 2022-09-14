import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import 'semantic-ui-css/semantic.min.css'
import { DisplayTypeUpdater } from '../components/DisplayType'
import './global.scss'

function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='theme-color' content='#000000' />
        <meta name='msapplication-navbutton-color' content='#000000' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#000000' />
      </Head>
      <Component {...pageProps} />
      <DisplayTypeUpdater />
    </RecoilRoot>
  )
}

// Next.js asks for a named function export
// instead of `export default () => {}`
export default App
