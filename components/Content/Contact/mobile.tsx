import { useState } from 'react'
import { tel } from '.'
import { brandImage, Contact } from '../../../data/contentData'
import { ClearAnchor } from '../../CustomLink'
import { Centered } from '../../MobileCentered'
import { SendMessageCTA } from '../Message'
import { ProductRoundedButton } from '../Product/Template'
import classes from '../../PageTemplates/Zone/mobile.module.scss'

export const ContactMobile = (props: Contact): JSX.Element => {
  const [showTel, setShowTel] = useState(false)
  const onTelClick = () => { setShowTel(true) }
  return (
    <>
      <div className='pt-5 pb-4 d-flex w-100 justify-content-center'>
        <div className='w-50 text-center'>
          <img
            style={{ maxWidth: 160, width: '70%' }}
            src={`/content/contacts/${props.image}`}
            alt={`Imagem ${props.name}`}
          />
        </div>
      </div>
      <Centered className='text-grey pb-5'>
        <div className='w-100 h-100 d-flex flex-column justify-content-center'>
          <div className='d-flex align-items-center'>
            <div className='d-flex flex-column text-grey text-center w-100'>
              <h2 className='text-grey font-weight-bold'>{props.name}</h2>
              <div className='mt-2 mb-2'>
                <img width='120' src={brandImage(props.brand)} alt={props.brand} />
              </div>
              <span className='fs-1_4 pt-1 pb-1'>{props.position}</span>
              <span className='fs-1_4 pb-1'>{props.location}</span>
            </div>
          </div>
          <p
            className={`${classes.description} fs-1_4 pt-4`}
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
      </Centered>
    </>
  )
}
