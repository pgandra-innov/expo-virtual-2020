import Head from 'next/head'
import { ActionButton } from '../../ActionButton'
import classes from './index.module.scss'
import { Sidebar as SemanticSidebar } from 'semantic-ui-react'
import { setSidebarContent, Sidebar } from '../../Sidebar'
import { AppState, useAppState } from '../../../data/appState'
import { PropsWithChildren, ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ContentTypes } from '../../../data/contentData'
import { getContentLink, getMessageLink, getTalkToUsLink } from '../../../data/getContentLink'
import { getZone } from '../../../data/getNumberQuery'

interface Props {
  leftContent?: ReactNode,
  centerContent?: ReactNode
  rightContent?: ReactNode
  footerContent?: ReactNode
}

declare global {
  interface Window {
    state: AppState | undefined
  }
}

export const LeftContentTemplate = (props: PropsWithChildren<unknown>):JSX.Element =>
  <>
    <div className="row">
      <Link href='/home'>
        <a>
          <img className="w-100" src="/images/LOGO_Horizontal_WhiteTransparent.png" alt="Logo Montellano" />
        </a>
      </Link>
    </div>
    <div className="row">
      <div className="col-10 offset-2 border-left">
        <h3>
          <strong>
            Showroom Virtual<br />
            2022
          </strong>
        </h3>
      </div>
    </div>
    {
      props.children
    }
  </>

export default function IndexTemplate (props: Props): JSX.Element {
  const [state, setState] = useAppState()
  const router = useRouter()
  const zone = getZone(router)

  useEffect(() => {
    window.state = state
  }, [state])

  return (
    <SemanticSidebar.Pushable>
      <Sidebar className='pb-0 pt-0 w-auto' />
      <SemanticSidebar.Pusher dimmed={state.sidebar.open}>
        <div className={`${classes.container} vh-100 text-white container-fluid d-flex flex-column`}>
          <Head>
            <title>Showroom Virtual 2022 | Montellano</title>
            <link rel="icon" href="/cropped-logo-icon-32x32.png" />
          </Head>
          <div className="row flex-grow-1">
            <div className={`${classes.privacyPolicyLink} col-2 position-absolute`}>
              <div className='col-12 d-flex justify-content-center pb-4'>
                <a href='https://www.montellano.pt/termos-e-condicoes/' target='_blank' rel='noreferrer' className='text-light'>
                  Política de Privacidade
                </a>
              </div>
            </div>
            {
              props.leftContent &&
                <div className="col-2 d-flex flex-column">
                  {props.leftContent}
                </div>
            }
            <div
              className={`${props.rightContent ? 'col-8' : 'col-9'} p-0 d-flex`}>
              {props.centerContent}
            </div>
            {
              props.rightContent &&
              <div className="col-1 d-flex position-relative flex-column justify-content-center align-items-center">
                {props.rightContent}
              </div>
            }
            <div className="col-1 d-flex flex-column justify-content-center align-items-center">
              <ActionButton
                icon='call'
                padding='pb-2'
                onClick={() => {
                  setState(setSidebarContent(ContentTypes.TalkToUs))
                  router.push(getTalkToUsLink(zone))
                }}
              />
              <ActionButton
                icon='mail'
                padding='pt-2 pb-2'
                onClick={() => {
                  setState(setSidebarContent(ContentTypes.Message))
                  router.push(getMessageLink(zone))
                }}
              />
              <ActionButton
                icon='news'
                padding='pt-2 pb-2'
                onClick={() => {
                  router.push(getContentLink('news', zone))
                }}
              />
            </div>
          </div>
          {
            props.footerContent
          }
        </div>
      </SemanticSidebar.Pusher>
    </SemanticSidebar.Pushable>
  )
}
