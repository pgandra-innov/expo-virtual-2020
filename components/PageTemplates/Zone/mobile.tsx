import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { Fragment } from 'react'
import { Divider } from 'semantic-ui-react'
import { Brand, brandImageDark, contentData, ContentTypes } from '../../../data/contentData'
import { getZone } from '../../../data/getNumberQuery'
import { isValidContentId } from '../../../data/isValidContentId'
import { zoneDataByBrand, zoneTitles } from '../../../data/zoneData'
import { CampaignMobile } from '../../Content/Campaigns/mobile'
import { ContactMobile } from '../../Content/Contact/mobile'
import { MessageContentMobile } from '../../Content/Message/mobile'
import { NewsItemMobile } from '../../Content/News/mobileItem'
import { NewsListMobile } from '../../Content/News/mobileList'
import { ProductMobileContent } from '../../Content/Product/mobile'
import { TalkToUsMobile } from '../../Content/TalkToUs/mobile'
import { VideoListMobile } from '../../Content/VideoList/mobile'
import { Centered } from '../../MobileCentered'
import { VideoModal } from '../../VideoModal'
import { MobileTemplate } from '../Mobile'
import classes from './mobile.module.scss'
import { ZoneMobileContentList } from './MobileContentList'

const getContentElement = (query: ParsedUrlQuery): JSX.Element | null => {
  const contentId = String(query.content)

  if (!isValidContentId(contentId)) return null
  const content = contentData[contentId]

  switch (content.type) {
    case ContentTypes.Product: return <ProductMobileContent {...content} />
    case ContentTypes.TalkToUs: return <TalkToUsMobile {...content} />
    case ContentTypes.Contact: return <ContactMobile {...content} />
    case ContentTypes.Message: return <MessageContentMobile {...content} />
    case ContentTypes.Campaign: return <CampaignMobile {...content} />
    case ContentTypes.VideoList: return <VideoListMobile {...content} />
    case ContentTypes.NewsItem: return <NewsItemMobile {...content} />
    case ContentTypes.NewsList: return <NewsListMobile {...content} />
    default: return null
  }
}

interface ZoneContentProps {
  zone: number
}

const ZoneContent = (props: ZoneContentProps): JSX.Element => {
  const content = zoneDataByBrand[props.zone]

  if (!content) return <></>

  const brands = Object.keys(content) as (Brand | 'None')[]

  // Used to render content without brand last in list
  let noBrandContent = null

  const isSingleNoBrandContent =
    brands.length === 1 &&
    brands[0] === 'None' &&
    content.None.length === 1

  return (
    <>
      {
        isSingleNoBrandContent
          ? <ZoneMobileContentList
            singleContent
            key={'None'}
            contentAndIdList={content.None}
            zone={props.zone}
          />
          : brands.map(contentKey => {
            if (contentKey === 'None') {
              noBrandContent = <ZoneMobileContentList
                key={'None'}
                contentAndIdList={content.None}
                zone={props.zone}
              />
              return null
            }
            return (
              <Fragment key={contentKey}>
                <Centered className='pt-4'>
                  <div>
                    <img src={brandImageDark(contentKey)} alt={contentKey} />
                  </div>
                </Centered>
                <ZoneMobileContentList
                  contentAndIdList={content[contentKey]}
                  zone={props.zone}
                />
                <Centered>
                  <Divider className='pt-2' />
                </Centered>
              </Fragment>
            )
          })
      }
      {
        noBrandContent
      }
    </>
  )
}

interface ContentProps {
  zone: number
  query: ParsedUrlQuery
}

const Content = (props: ContentProps): JSX.Element => {
  const contentElement = getContentElement(props.query)
  return (
    <>
      <div className='flex-grow-1 bg-white text-grey p-0'>
        <div className='pt-4'>
          {
            contentElement ?? <ZoneContent zone={props.zone} />
          }
        </div>
      </div>
      <br />
    </>
  )
}

export const ZoneMobileTemplate = (): JSX.Element => {
  const router = useRouter()
  const zone = getZone(router)
  const isContentPage = isValidContentId(router.query.content)
  return (
    <MobileTemplate underContent={<Content zone={zone} query={router.query} />}>
      <div className='pl-2' role='button' onClick={() => router.back()}>
        <span className='fs-2_4'>&lsaquo;</span>
        <span className={`${classes.backButtonText} fs-1 position-relative pl-2`}>
          {
            zone === -1
              ? 'VOLTAR'
              : isContentPage
                ? `VOLTAR À ZONA ${zone}`
                : 'VOLTAR AO PERCURSO'
          }
        </span>
      </div>
      <Divider/>
      <div className={zone === -1 ? '' : 'pb-4'}>
        {
          zone !== -1 &&
            <h5 className='font-weight-bold'>
              ZONA {zone}
            </h5>
        }
        <h3 className='font-weight-bold'>
          {
            zoneTitles[zone]?.text
          }
        </h3>
      </div>
      <VideoModal mobile />
    </MobileTemplate>
  )
}
