import classes from './index.module.scss'
import Link from 'next/link'
import { Modal } from 'semantic-ui-react'
import { RoundedButton } from '../RoundedButton'
import { useEffect, useState } from 'react'

interface WelcomeOverlayProps {
  fullWidth?: boolean
}

export const WelcomeOverlayContent = (props: WelcomeOverlayProps): JSX.Element =>
  <div className={`
    d-flex flex-column justify-content-center
    ${props.fullWidth ? '' : 'col-8'}
  `}>
    <div className={`${classes.welcomeOverlayHeaderContainer} d-flex flex-column border-left text-white pl-4`}>
      <span className={classes.welcomeOverlayHeader}>
        Montellano
      </span>
      <span className={classes.welcomeOverlaySubHeader}>
        Bem-vindos ao <br/>
        Showroom Virtual 2022
      </span>
    </div>
    <p className={`${classes.welcomeOverlayDescription} text-white pt-5 pl-4`}>
    A Montellano criou este showroom virtual a pensar em si. <br/>
    <br/>
    Temos todo o gosto em recebê-lo nas nossas instalações e beber um cafezinho consigo. Até lá visite-nos no nosso showroom 2022 e descubra as mais recentes novidades de medicina dentária, uma vasta gama de soluções ao seu dispor!<br/>
    <br/>
    Inicie a visita, clicando no botão a baixo.
    </p>
    <div className='pl-4 pt-5'>
      <Link href='/home'>
        <a className='text-decoration-none'>
          <RoundedButton
            className={classes.welcomeOverlayButton}
            text='Iniciar Visita'
          />
        </a>
      </Link>
    </div>
  </div>

export const WelcomeOverlay = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  // Prevent issues with server-side rendering
  // where rendered HTML doesn't match on client-side
  useEffect(() => { setOpen(true) }, [])

  return (
    <Modal
      className={classes.modal}
      dimmer='blurring'
      open={open}
    >
      <div className='row h-100'>
        <div className='col-2'>
          <img className='w-100' src='/images/LOGO_Horizontal_WhiteTransparent.png' alt='Logo Montellano' />
        </div>
        <WelcomeOverlayContent />
      </div>
    </Modal>
  )
}
