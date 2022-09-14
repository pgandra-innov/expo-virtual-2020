import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { AppState, useAppState } from '../../../data/appState'
import { contentData, Message } from '../../../data/contentData'
import { getMessageLink } from '../../../data/getContentLink'
import { getZone } from '../../../data/getNumberQuery'
import { ClearAnchor } from '../../CustomLink'
import { SidebarContentIds } from '../../Sidebar'
import { ContentTemplate } from '../Template/Template'
import classes from './index.module.scss'

export const setEmailTo = (email: string) => (state: AppState): void => {
  state.message.emailTo = email
}

interface SendMessageCTAProps {
  emailTo?: string
}

export const SendMessageCTA = (props: PropsWithChildren<SendMessageCTAProps>): JSX.Element => {
  const router = useRouter()
  const [, setState] = useAppState()
  const emailTo = props.emailTo ?? contentData.message.defaultEmailTo
  return (
    <Link href={getMessageLink(getZone(router))}>
      <ClearAnchor onClick={() => { setState(setEmailTo(emailTo)) }} >
        {props.children}
      </ClearAnchor>
    </Link>
  )
}

export const MessageContent = (props: Message): JSX.Element => {
  const [state] = useAppState()
  const emailTo = state.message.emailTo || props.defaultEmailTo
  return (
    <ContentTemplate onExitRouteBack={state.sidebar.content !== SidebarContentIds.Message}>
      <div>
        <h1 className='pre-line text-bold'>
          {props.heading}
        </h1>
      </div>
      <div>
        <p className='pre-line pt-4' dangerouslySetInnerHTML={{ __html: props.description }} />
      </div>
      <iframe
        className={`${classes.iframe} mt-5 mb-3`}
        src={`${props.baseSrc}?emailTo=${emailTo}`}
        frameBorder='0'
        scrolling='yes'
      />
    </ContentTemplate>
  )
}
