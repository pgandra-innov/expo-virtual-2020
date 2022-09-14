import { VideoLinkData, zoneData } from '../../data/zoneData'
import { AppState, useAppState } from '../../data/appState'
import { StepButton } from '../Stepper/StepButton'
import classes from './index.module.scss'
import { Video, VideoProps } from './Video'
import { contentData, ContentTypes } from '../../data/contentData'
import { setSidebarContent, SidebarContentIds } from '../Sidebar'
import { setOpenVideo } from '../VideoModal'
import { useRouter } from 'next/router'

export interface VideoLinkProps extends VideoLinkData {
  /** Content to show beside StepButton */
  buttonSideContent?: JSX.Element
  /** Current zone, to correctly set links (e.g product links) */
  zone: number
}

const VideoLink = (props: VideoLinkProps): JSX.Element => {
  const [, setState] = useAppState()
  const router = useRouter()

  const content = props.contentId ? contentData[props.contentId] : undefined

  const showBrandImageOnTop = props.brandImage && !props.labelText

  const brandImage = props.brandImage &&
    (
      content?.type === ContentTypes.Product ||
      content?.type === ContentTypes.ProductList
    ) &&
    <img src={props.brandImage} alt={content.brand} />

  const onClick = () => {
    if (content?.type === ContentTypes.TalkToUs) {
      setState(setSidebarContent(SidebarContentIds.TalkToUs))
    }
    if (props.videoLink) {
      props.videoLink && setState(setOpenVideo(props.videoLink))
    } else if (props.externalLink) {
      window.open(props.externalLink)
    } else {
      router.push(`/zone/${props.zone}/content/${props.contentId}`)
    }
  }

  return (
    <a
      className={`
        ${classes.videoLinkAnchor} position-absolute text-decoration-none d-flex flex-column
        ${
          showBrandImageOnTop
            ? 'align-items-center'
            : props.alignRight ? 'align-items-end' : 'align-items-start'
        }
      `}
      onClick={onClick}
      style={{ top: `${props.top}%`, left: `${props.left}%` }}
      target={props.externalLink ? '_blank' : undefined}
    >
    {
      showBrandImageOnTop && brandImage
    }
    <div
      className={`
        d-flex ${props.alignRight ? 'flex-row-reverse' : ''} align-items-center
        ${showBrandImageOnTop ? 'pt-3' : ''}
      `}
    >
      <StepButton
        active
        className={`${classes.videoLinkStepButton} p-3`}
      />
      {
        !showBrandImageOnTop &&
          <span className={props.alignRight ? 'pr-2' : 'pl-2'}>
            {brandImage}
          </span>
      }
    </div>
    {
      props.labelText &&
        <div
          className={`
            ${classes.videoLinkText} pl-2 pr-2 d-flex flex-column align-items-start
            ${props.alignRight ? 'border-right' : 'border-left'} border-light text-light
            position-relative`
          }
        >
          {
            content && 'newItem' in content && content.newItem &&
              <div className={`${classes.videoLinkNewDot} rounded-circle`}></div>
          }
          <small className={`${classes.heading} w-100 pt-1`}>
            {props.heading}
          </small>
          <span className={`${classes.videoLinkTextLabel} d-flex align-items-center justify-content-start`}>
            {props.labelText?.trim()}
            {props.externalLink &&
              <>
                &nbsp;
                <i className="material-icons-outlined">launch</i>
              </>
            }
          </span>
        </div>
      }
    </a>
  )
}

const setVideoLinks = (showVideoLinks: boolean) => (state: AppState) => {
  state.showVideoLinks = showVideoLinks
}

const showVideoLinks = setVideoLinks(true)
export const hideVideoLinks = setVideoLinks(false)

interface Props {
  zone: number
  videoLoadTime: VideoProps['videoLoadTime']
}

export const VideoContainer = (props: Props): JSX.Element => {
  const [state, setState] = useAppState()
  const selectedStep = zoneData[props.zone][state.zone.step]
  return (
    <div className="h-100 w-100 position-relative d-flex align-items-center">
      <div className="d-flex position-relative w-100">
        <Video
          videoLoadTime={props.videoLoadTime}
          onTimeReached={() => setState(showVideoLinks)}
          zone={props.zone}
          steps={zoneData[props.zone]}
          step={state.zone.step}
        />
        <div className={`${classes.videoLinkContainer} w-100 h-100 position-absolute`}>
          {
            state.showVideoLinks && selectedStep.videoLinks.map((videoLink, index) =>
              <VideoLink key={index} {...videoLink} zone={props.zone} />
            )
          }
        </div>
      </div>
    </div>
  )
}
