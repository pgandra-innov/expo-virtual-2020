import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppState } from '../../../data/appState'
import { Contact, contentData, TalkToUs as ITalkToUs } from '../../../data/contentData'
import { ClearAnchor } from '../../CustomLink'
import { SidebarContentIds } from '../../Sidebar'
import { contactLink } from '../Contact'
import { ContentTemplate } from '../Template/Template'
import classes from './index.module.scss'

export const TalkToUs = (props: ITalkToUs): JSX.Element => {
  const [state] = useAppState()
  const router = useRouter()
  return (
    <ContentTemplate onExitRouteBack={state.sidebar.content !== SidebarContentIds.TalkToUs}>
      <div className='d-flex align-items-center'>
        <img src='/content/icons/talkToUsIcon.png' alt='Talk to us icon' />
        <h1 className='pre-line pl-5'>{props.heading.trim()}</h1>
      </div>
      <p className={`${classes.description} pt-5`}>
        {props.description}
      </p>
      <div className='flex-grow-1'>
        <div className={`${classes.gridContainer} pt-5`}>
          {
            props.contacts.map(contactId => {
              const contactData: Contact = contentData[contactId]
              const name = contactData.name.trim()
              return (
                <Link key={contactId} href={contactLink(router, contactId)}>
                  <ClearAnchor className='pb-5'>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                      <div>
                        <img className="rounded-circle" src={`/content/contacts/${contactData.image}`} alt={`Image ${name}`} />
                      </div>
                      <h4 className={`${classes.heading} pt-4 pb-2`}>{name}</h4>
                      <span className='pb-2 text-center'>{contactData.position}</span>
                      {
                        contactData.location &&
                          <span className='pb-2'>{contactData.location}</span>
                      }
                    </div>
                  </ClearAnchor>
                </Link>
              )
            })}
        </div>
      </div>
    </ContentTemplate>
  )
}
