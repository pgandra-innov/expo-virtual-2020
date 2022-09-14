import { Modal } from 'semantic-ui-react'
import { AppState, useAppState } from '../../data/appState'
import { ExitIcon } from '../ExitIcon'
import classes from './index.module.scss'

export const setOpenVideo = (video: string) => (state: AppState): void => { state.openVideo = video }

interface Props {
  /** If modal should render for modal view (smaller screen) */
  mobile?: boolean
}

export const VideoModal = (props: Props):JSX.Element => {
  const [state, setState] = useAppState()
  return (
    <Modal
      basic
      open={!!state.openVideo}
      onClose={() => {
        setState(state => { state.openVideo = '' })
      }}
      closeIcon={
        <ExitIcon className={classes.modalExitIcon} />
      }
      closeOnDimmerClick={true}
    >
      <Modal.Content className='p-0'>
        {
          !!state.openVideo &&
            <iframe
              style={props.mobile ? { width: '100%' } : { width: '50vw', height: '50vh' }}
              src={`https://www.youtube-nocookie.com/embed/${state.openVideo}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
        }
      </Modal.Content>
    </Modal>
  )
}
