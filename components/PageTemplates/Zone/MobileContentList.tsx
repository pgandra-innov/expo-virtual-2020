import { Fragment } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Divider } from 'semantic-ui-react'
import { Campaign, CatalogList, contentData, ContentTypes, DiscountList, OfferList, Product, VideoList } from '../../../data/contentData'
import { getContentLink } from '../../../data/getContentLink'
import { ContentAndId } from '../../../data/zoneData'
import { ContactButtons } from '../../Content/Product/ContactButtons'
import { TalkToUsMobile } from '../../Content/TalkToUs/mobile'
import { ClearAnchor, CustomLink } from '../../CustomLink'
import { Centered } from '../../MobileCentered'
import { RoundedButton } from '../../RoundedButton'
import { ContentLink } from './ContentLink'
import classes from './mobile.module.scss'

const ProductListItem = (props: Product & ContentLink): JSX.Element =>
  <>
    <Centered wide className='pt-5 pb-4'>
      <img
        className={`${classes.contentImage} mw-100`}
        src={props.image}
        alt={props.imageAlt}
      />
    </Centered>
    <Centered>
      <h4 className={classes.contentCategory}>
        {props.category}
      </h4>
      <h2 className={classes.contentName}>
        {props.name}
      </h2>
      <h3 className={classes.contentHeading}>
        {props.heading}
      </h3>
      <CustomLink aProps={{ className: 'pt-3 pb-5 w-100' }} href={props.contentLink}>
        <RoundedButton className='w-100' text='Ver mais' />
      </CustomLink>
    </Centered>
  </>

const TalkToUsItem = (): JSX.Element =>
  <>
    <Centered className='pt-4 pb-4'>
      <h2 className={classes.contentCategory}>
        Deseja mais informações?
      </h2>
      <h4 className={classes.contentName}>
        Envie-nos uma mensagem e entraremos em contacto consigo com a maior brevidade.
      </h4>
      <ContactButtons column />
    </Centered>
  </>

const CatalogListItem = (props: CatalogList): JSX.Element =>
  <>
    <Centered className='pt-4 text-grey'>
      <h1 className={classes.contentCategory}>
        {props.heading}
      </h1>
      <p
        className='fs-1_4 pre-line'
        dangerouslySetInnerHTML={{ __html: props.description.trim() }}
      />
      {
          props.catalogGroups.map((catalogGroup, index) =>
            <Fragment key={index}>
              <h2 className='font-weight-bold pt-2 pb-2'>
                {catalogGroup.heading}
              </h2>
              <Carousel
                defaultActiveIndex={0}
                nextIcon={null}
                prevIcon={null}
              >
                {
                  catalogGroup.catalogs.map((catalog, index) =>
                    <Carousel.Item key={index}>
                      <div className='w-100 d-flex flex-column align-items-center pb-5'>
                        <div className={`${classes.contentImage} ${classes.catalogCarouselItem} pt-2 w-100 text-center`}>
                          <img
                            className={'mw-100 mh-100'}
                            src={catalog.image}
                            alt={catalog.imageAlt}
                          />
                        </div>
                        <h3 className={`${classes.contentName} pt-3 pb-2 text-center w-100`}>
                          {catalog.description}
                        </h3>
                        <div>
                          <ClearAnchor target='_blank' href={catalog.downloadLink}>
                            <RoundedButton text='Download' />
                          </ClearAnchor>
                        </div>
                      </div>
                    </Carousel.Item>
                  )
                }
              </Carousel>
              <Divider className='pt-2 pb-2' />
            </Fragment>)
      }
    </Centered>
  </>

const DiscountListItem = (props: DiscountList): JSX.Element =>
  <>
    <Centered className='pt-4 text-grey'>
      <h1 className={classes.contentCategory}>
        {props.heading}
      </h1>
      <p
        className='fs-1_4 pre-line'
        dangerouslySetInnerHTML={{ __html: props.description.trim() }}
      />
      <h2 className='pt-2 pb-3 font-weight-bold'>
        {props.secondHeading}
      </h2>
      <Carousel
        defaultActiveIndex={0}
        nextIcon={null}
        prevIcon={null}
      >
        {
          props.discountGroups.map((discountGroup, index) =>
            <Carousel.Item key={index}>
              <div className='w-100 d-flex flex-column align-items-center pb-5'>
                <div className={`
                  ${classes.contentImage}
                  ${classes.catalogCarouselItem}
                  pt-2 w-100 text-center
                  d-flex justify-content-center align-items-center
                `}>
                  <img
                    className={'mw-100 mh-100'}
                    src={discountGroup.image}
                    alt={discountGroup.imageAlt}
                  />
                </div>
                <div className='w-100'>
                  {
                    discountGroup.discounts.map((discount, index) =>
                      <div key={index} className='row w-100 m-0 pt-3 pl-0 pr-0 pb-0'>
                        <div className='col-6 p-0 m-0 font-weight-bold fs-3 text-center'>
                          {discount.heading}
                        </div>
                        <div
                          className='col-6 fs-1_4 m-0 p-0'
                          dangerouslySetInnerHTML={{ __html: discount.description.trim() }}
                        />
                      </div>)
                  }
                </div>
              </div>
            </Carousel.Item>)
        }
      </Carousel>
      <p
        className='pre-line'
        dangerouslySetInnerHTML={{ __html: props.footnote.trim() }}
      />
      <Divider className='pt-2 pb-2' />
    </Centered>
  </>

const OfferListItem = (props: OfferList): JSX.Element =>
  <>
    <Centered className='pt-2 text-grey'>
      <h1>Ofertas</h1>
    </Centered>
    {
      props.offers.map((offer, index) =>
        <Centered
          key={index}
          className={`
            pt-2 text-grey w-100
            ${offer.mobileBlueBackground ? 'bg-expo-blue text-white' : ''}
          `}
        >
          <h3 className='pt-3 pb-3'>{offer.heading}</h3>
          <div className='w-100'>
            <img
              className='w-100'
              src={offer.mobileImage}
              alt={offer.mobileImageAlt}
            />
          </div>
          {
            offer.bottomDescription &&
              <p
                className='fs-1_4 pre-line pt-4 pb-4'
                dangerouslySetInnerHTML={{ __html: offer.bottomDescription.trim() }}
              />
          }
        </Centered>)
    }
  </>

const CampaignItem = (props: Campaign & ContentLink): JSX.Element =>
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

const VideoListItem = (props: VideoList & ContentLink): JSX.Element =>
  <>
    <Centered className='text-grey'>
      <h2 className={classes.contentCategory}>
        {props.heading}
      </h2>
      <h4 className='pt-2 pb-2'>
        {props.description}
      </h4>
      <CustomLink aProps={{ className: 'pt-3 pb-5 w-100' }} href={props.contentLink}>
        <RoundedButton className='w-100' text='Ver mais' />
      </CustomLink>
      <Divider className='pt-2 pb-2' />
    </Centered>
  </>

interface ZoneContentListProps {
  contentAndIdList: ContentAndId[]
  zone: number
  /** If the passed content is the only one in the list, and
   * it's full content page should be rendered instead of a list item
   */
  singleContent?: boolean
}

export const ZoneMobileContentList = (props: ZoneContentListProps): JSX.Element => {
  // To render talkToUs buttons last in list
  // and remove duplicate talkToUs entries
  let talkToUsContent = null
  return (
    <>
      {
        props.contentAndIdList.map((contentAndId, index) => {
          const { content, id } = contentAndId
          const key = `${index}-${id}`
          const contentLink = getContentLink(id, props.zone)
          switch (content.type) {
            case ContentTypes.Product:
              return (
                <ProductListItem
                  key={key}
                  {...content}
                  contentLink={contentLink}
                />
              )
            case ContentTypes.ProductList:
              return <ZoneMobileContentList
                key={key}
                zone={props.zone}
                contentAndIdList={content.productsIds.map(productId => ({
                  id: productId,
                  content: contentData[productId]
                }))}
              />
            case ContentTypes.TalkToUs:
              talkToUsContent = props.singleContent
                ? <TalkToUsMobile key={key} {...content} />
                : <TalkToUsItem key={key} />
              return null
            case ContentTypes.CatalogList:
              return <CatalogListItem key={key} {...content} />
            case ContentTypes.DiscountList:
              return <DiscountListItem key={key} {...content} />
            case ContentTypes.OfferList:
              return <OfferListItem key={key} {...content} />
            case ContentTypes.Campaign:
              return <CampaignItem key={key} contentLink={contentLink} {...content} />
            case ContentTypes.VideoList:
              return <VideoListItem key={key} contentLink={contentLink} {...content} />
            default:
              return <Fragment key={key}></Fragment>
          }
        })
      }
      {
        talkToUsContent
      }
    </>
  )
}
