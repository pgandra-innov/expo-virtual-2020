import { NextRouter } from 'next/router'
import { useState } from 'react'
import { brandImage, Contact as IContact, ContactId } from '../../../data/contentData'
import { getZone } from '../../../data/getNumberQuery'
import { ClearAnchor } from '../../CustomLink'
import { zoneContentLink } from '../../PageTemplates/Zone/Zone'
import { SendMessageCTA } from '../Message'
import { ProductRoundedButton } from '../Product/Template'
import { ContentTemplate } from '../Template/Template'
import classes from './index.module.scss'

export const tel = (phoneNumber: string): string => `tel:${phoneNumber}`

export const contactLink = (router: NextRouter, contactId: ContactId): string => {
  const zone = getZone(router)
  if (zone === -1) return `/home/content/${contactId}`
  else return zoneContentLink(zone, contactId)
}

export const Contact = (props: IContact): JSX.Element => {
  const [showTel, setShowTel] = useState(false)
  const onTelClick = () => { setShowTel(true) }
  const name = props.name.trim()
  return (
    <ContentTemplate onExitRouteBack>
      <div className='h-100 d-flex flex-column justify-content-center'>
        <div className='d-flex align-items-center'>
          <div>
            <img className="rounded-circle" src={`/content/contacts/${props.image}`} alt={`Imagem ${name}`} />
          </div>
          <div className='d-flex flex-column pl-5'>
            <h1 className={`${classes.heading}`}>{name}</h1>
            <div className={classes.brandImage}>
              <img className='w-100' src={brandImage(props.brand)} alt={props.brand} />
            </div>
            <span className='pt-2 pb-2'>{props.position}</span>
            <span className='pt-2 pb-2'>{props.location}</span>
          </div>
        </div>
        <p
          className={`${classes.description} pt-5`}
          dangerouslySetInnerHTML={{ __html: props.description.trim() }}
        />
        <div className='d-flex flex-column align-items-center justify-content-between pt-5'>
          <ClearAnchor className={props.noTeams ? 'mb-3' : ''} onClick={onTelClick} href={tel(props.phoneNumber)}>
            <ProductRoundedButton
              icon='local_phone'
              text={showTel ? props.phoneNumber : 'Ligar agora'}
            />
          </ClearAnchor>
          {
            !props.noTeams &&
              <ClearAnchor
                className='mt-3 mb-3'
                href={`https://teams.microsoft.com/l/chat/0/0?users=${props.email}`}
                target='_blank'
              >
                <ProductRoundedButton outlined text='Conferência por Teams' />
              </ClearAnchor>
          }
          <SendMessageCTA emailTo={props.email}>
              <ProductRoundedButton outlined icon='mail' text='Enviar email' />
          </SendMessageCTA>
        </div>
      </div>
    </ContentTemplate>
  )
}
