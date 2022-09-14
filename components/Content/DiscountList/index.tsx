import {
  Content,
  ContentIds,
  DiscountGroup as IDiscountGroup,
  DiscountList as IDiscountList
} from '../../../data/contentData'
import { ProductRoundedButton } from '../Product/Template'
import { ContentTemplate } from '../Template/Template'
import { ClearAnchor } from '../../CustomLink'
import classes from './index.module.scss'
import { TalkToUsButton } from '../../TalkToUsButton'

const Discount = (props: Content): JSX.Element =>
  <div className='d-flex align-items-center'>
    <span className={`${classes.discountHeading} font-weight-bold`}>
      {props.heading}
    </span>
    <span
      className={`${classes.discountDescription} pl-3`}
      dangerouslySetInnerHTML={{ __html: props.description.trim() }}
    />
  </div>

const DiscountGroup = (props: IDiscountGroup): JSX.Element =>
  <div className='d-flex pt-5'>
    <div className='d-flex flex-column align-items-center' style={{ width: '150px' }}>
      <img className={classes.discountGroupImage} src={props.image} alt={props.imageAlt} />
      <h5 className={`${classes.discountGroupDescription} pt-3 text-center`}>
        {props.description.trim()}
      </h5>
    </div>
    <div className='d-flex flex-column'>
      {
        props.discounts.map((content, index) =>
          <Discount key={index} {...content} />)
      }
    </div>
  </div>

export const DiscountList = (props: IDiscountList): JSX.Element =>
  <ContentTemplate>
    <div className={`${classes.discountListContainer} d-flex flex-column`}>
      <div>
        <img width='160' src={props.brandImage} alt={props.brandImageAlt} />
      </div>
      <div>
        <h3 className='pt-5 font-weight-bold'>
          {props.heading}
        </h3>
      </div>
      <p
        className={`${classes.discountListDescription} pt-4 pb-2`}
        dangerouslySetInnerHTML={{ __html: props.description.trim() }}
      />
      <div>
        <h3 className='font-weight-bold'>
          {props.secondHeading}
        </h3>
      </div>
      {
        props.discountGroups.map((content, index) =>
          <DiscountGroup key={index} {...content} />)
      }
      <div className={`${classes.footnote} pt-4`}>
        <small>
          {props.footnote.trim()}
        </small>
      </div>
      <div className='d-flex justify-content-between pt-5'>
        <TalkToUsButton talkToUsId={ContentIds.talkToUs03} ButtonComponent={ProductRoundedButton} />
        <ClearAnchor href={props.storeLink} target="_blank">
          <ProductRoundedButton outlined text='Visite a Nossa Loja Online' />
        </ClearAnchor>
      </div>
    </div>
  </ContentTemplate>
