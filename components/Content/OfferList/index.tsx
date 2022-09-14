import {
  OfferList as IOfferList,
  Offer as IOffer
} from '../../../data/contentData'
import { ContentTemplate } from '../Template/Template'
import classes from '../DiscountList/index.module.scss'

// TODO: refactor content with dangerouslySetInnerHTML
const HTMLParagraph = (props: { content: string }): JSX.Element =>
  <p
    className={`${classes.discountListDescription} pt-4`}
    dangerouslySetInnerHTML={{ __html: props.content.trim() }}
  />

const Offer = (props: IOffer): JSX.Element =>
  <>
    <div>
      <h3
        className='pt-4 pb-2 font-weight-bold pre-line'
        dangerouslySetInnerHTML={{ __html: props.heading.trim() }}
      />
    </div>
    {
      props.topDescription &&
        <HTMLParagraph content={props.topDescription} />
    }
    <div>
      <img src={props.image} alt={props.imageAlt} />
    </div>
    {
      props.bottomDescription &&
        <HTMLParagraph content={props.bottomDescription} />
    }
  </>

export const OfferListContent = (props: IOfferList): JSX.Element =>
  <ContentTemplate>
    <div className={`${classes.discountListContainer} d-flex flex-column`}>
      <div>
        <img width='160' src={props.image} alt={props.imageAlt} />
      </div>
      <div>
        <h3 className='pt-5 font-weight-bold'>
          {props.heading}
        </h3>
      </div>
      <HTMLParagraph content={props.description} />
      {
        props.offers.map((offer, index) =>
          <Offer key={index} {...offer} />)
      }
    </div>
  </ContentTemplate>
