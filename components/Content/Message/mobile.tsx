import { useAppState } from '../../../data/appState'
import { Message } from '../../../data/contentData'
import { Centered } from '../../MobileCentered'
import classes from '../../PageTemplates/Zone/mobile.module.scss'

export const MessageContentMobile = (props: Message): JSX.Element => {
  const [state] = useAppState()
  const emailTo = state.message.emailTo || props.defaultEmailTo
  return (
    <Centered wide className='text-grey'>
      <div>
        <h1 className='pre-line text-bold'>
          {props.heading}
        </h1>
      </div>
      <div className='mb-4'>
        <p className='pre-line pt-4 fs-1_2' dangerouslySetInnerHTML={{ __html: props.description }} />
      </div>
      <iframe
        className={`${classes.iframe} mt-5 mb-3`}
        src={`${props.baseSrc}?emailTo=${emailTo}`}
        frameBorder='0'
        scrolling='yes'
      />
    </Centered>
  )
}
