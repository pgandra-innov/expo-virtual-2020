import { NewsItem } from '../../../data/contentData'
import { Centered } from '../../MobileCentered'
import classes from '../../PageTemplates/Zone/mobile.module.scss'

export const NewsItemMobile = (props: NewsItem): JSX.Element =>
  <>
    <Centered wide className='pt-2 pb-4'>
      <img
        className={`${classes.contentImage} mw-100`}
        src={props.image}
        alt={props.imageAlt}
      />
    </Centered>
    <Centered>
      <h2 className={classes.contentCategory}>
        {props.heading}
      </h2>
      <p
        className='pre-line fs-1_6 pb-5 pt-2'
        dangerouslySetInnerHTML={{ __html: props.description.trim() }}
      />
    </Centered>
  </>
