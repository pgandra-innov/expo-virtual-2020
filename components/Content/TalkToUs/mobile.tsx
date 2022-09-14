import Link from 'next/link'
import { useRouter } from 'next/router'
import { Contact, contentData, TalkToUs } from '../../../data/contentData'
import { ClearAnchor } from '../../CustomLink'
import { Centered } from '../../MobileCentered'
import classes from '../../PageTemplates/Zone/mobile.module.scss'
import { contactLink } from '../Contact'

export const TalkToUsMobile = (props: TalkToUs): JSX.Element => {
  const router = useRouter()
  return (
    <>
      {/* <div className='pt-4 d-flex w-100 justify-content-center'>
        <div className='w-50 text-center'>
          <img
            style={{ maxWidth: 178, width: '100%' }}
            src='/content/icons/talkToUsMobileIcon.png'
            alt='Fale Connosco'
          />
        </div>
      </div> */}
      <Centered className='text-grey'>
        <div className='d-flex pt-4 align-items-center'>
          <img
            className='mr-2'
            style={{ height: '4rem' }}
            src='/content/icons/talkToUsMobileIcon.png'
            alt='Fale Connosco'
          />
          <h2 className='font-weight-bold'>
            Fale Connosco
          </h2>
        </div>
        <p className='mt-4 fs-1_2'>
          A Montellano possui uma equipa dedicada para si.
          Estamos prontos para esclarecer todas as suas questões relativas aos nossos equipamentos e produtos.
        </p>
        <div className={`${classes.gridContainer} pt-5`}>
          {
            props.contacts.map(contactId => {
              const contactData: Contact = contentData[contactId]
              const name = contactData.name?.trim()
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
            })
          }
        </div>
      </Centered>
    </>
  )
}
