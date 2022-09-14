import { Divider } from 'semantic-ui-react'
import { contentData, NewsItem, NewsList } from '../../../data/contentData'
import { getContentLink } from '../../../data/getContentLink'
import { CustomLink } from '../../CustomLink'
import { Centered } from '../../MobileCentered'
import { ContentLink } from '../../PageTemplates/Zone/ContentLink'
import classes from '../../PageTemplates/Zone/mobile.module.scss'
import { RoundedButton } from '../../RoundedButton'

const NewsListMobileItem = (props: NewsItem & ContentLink): JSX.Element =>
  <>
    <Centered wide className='pt-2 pb-4'>
      <img
        className={`${classes.contentImage} mw-100`}
        src={props.image}
        alt={props.imageAlt}
      />
    </Centered>
    <Centered>
      <h4 className={classes.contentCategory}>
        {props.heading}
      </h4>
      <CustomLink aProps={{ className: 'pt-3 pb-3 w-100' }} href={props.contentLink}>
        <RoundedButton className='w-100' text='Ver mais' />
      </CustomLink>
      <Divider className='pt-2 pb-2' />
    </Centered>
  </>

export const NewsListMobile = (props: NewsList): JSX.Element =>
  <>
    <Centered>
      <h1 className={`${classes.contentCategory} pt-2 pb-4`}>
        Notícias
      </h1>
    </Centered>
    {
      props.items.map(itemId =>
        <NewsListMobileItem
          key={itemId}
          {...contentData[itemId]}
          contentLink={getContentLink(itemId)}
        />)
    }
  </>
