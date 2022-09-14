import { VideoGrid } from '.'
import { VideoList } from '../../../data/contentData'
import { Centered } from '../../MobileCentered'
import { ContactButtons } from '../Product/ContactButtons'
import classes from '../../PageTemplates/Zone/mobile.module.scss'

export const VideoListMobile = (props: VideoList): JSX.Element =>
  <>
    <Centered>
      <h2 className={classes.contentCategory}>
        {props.heading}
      </h2>
      <h4 className='pt-2 pb-2'>
        {props.description}
      </h4>
      <p
        className='pre-line fs-1_2'
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
      <VideoGrid {...props} />
      <ContactButtons column />
    </Centered>
  </>
