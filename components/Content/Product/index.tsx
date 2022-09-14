import { brandImageDark, Product } from '../../../data/contentData'
import { ProductTitle } from './Title'
import classes from './index.module.scss'
import { ProductContentTemplate } from './Template'

export const ProductContent = (props: Product): JSX.Element =>
  <ProductContentTemplate
    showSpecialPriceBadge
    {...props}
    title={
      <div className='d-flex flex-column pb-4'>
        <img className={`${classes.brandImage} pb-2`} src={brandImageDark(props.brand)} alt={`${props.brand} Logo`} />
        <ProductTitle category={props.category} name={props.name} categoryClassName='pt-4'/>
      </div>
    }
  />
