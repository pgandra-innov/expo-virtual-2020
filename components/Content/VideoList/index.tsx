import { HTMLProps } from 'react'
import { useAppState } from '../../../data/appState'
import { VideoList as IVideoList, Video as IVideo } from '../../../data/contentData'
import { setOpenVideo } from '../../VideoModal'
import { ContactButtons } from '../Product/ContactButtons'
import { ContentTemplate } from '../Template/Template'
import classes from './index.module.scss'

type VideoProps = IVideo & HTMLProps<HTMLDivElement>

const Video = (props: VideoProps): JSX.Element =>
  <div
    role='button'
    className='d-flex flex-column justify-content-start align-items-start'
    onClick={props.onClick}
  >
    <div>
      <img src={props.image} alt={props.imageAlt} className={`${classes.videoImage} w-100`} />
    </div>
    <div className='pt-2'>
      {props.description}
    </div>
  </div>

export const VideoGrid = (props: IVideoList): JSX.Element => {
  const [, setState] = useAppState()
  return (
    <div className={classes.videoGrid}>
      {
        props.videos.map(video =>
          <Video
            key={video.src}
            {...video}
            onClick={() => {
              setState(setOpenVideo(video.src))
            }}
          />)
      }
    </div>
  )
}

export const VideoList = (props: IVideoList): JSX.Element =>
  <ContentTemplate>
    <div className='d-flex pt-3'>
      <h3 className='font-weight-bold'>
        {props.heading}
      </h3>
    </div>
    <p
      className='pt-4 pb-4'
      dangerouslySetInnerHTML={{ __html: props.description.trim() }}
    />
    <VideoGrid {...props} />
    <ContactButtons />
  </ContentTemplate>
