import { RoundedButton } from '../../RoundedButton'
import { ProductHeader } from '../Product/Header'
import { ProductTitle } from '../Product/Title'
import productClasses from '../Product/index.module.scss'
import classes from './index.module.scss'
import { contentData, ProductList as IProductList, Product as IProduct, ProductId, brandImageDark } from '../../../data/contentData'
import { ContentTemplate } from '../Template/Template'
import Link from 'next/link'
import { getZone } from '../../../data/getNumberQuery'
import { useRouter } from 'next/router'

interface ProductProps extends IProduct {
  id: ProductId
}

const Product = (props: ProductProps) => {
  const zone = getZone(useRouter())
  return (
    <div className='d-flex pt-5 pb-2'>
      <div className='d-flex flex-grow-1 flex-column' >
        <ProductTitle category={props.category} name={props.name} />
        <ProductHeader className='pt-1'>
          {props.heading}
        </ProductHeader>
        <div className='pt-3'>
          <Link href={`/zone/${zone}/content/${props.id}`}>
            <a>
              <RoundedButton text='Ver mais' className={classes.roundedButton} />
            </a>
          </Link>
        </div>
      </div>
      <div className='col-5 p-0'>
        <img className='w-100' src={props.image} alt={props.name} />
      </div>
    </div>
  )
}

export const ProductList = (props: IProductList): JSX.Element =>
  <ContentTemplate>
    <div className=''>
      <img className={`${productClasses.brandImage} pb-2`} src={brandImageDark(props.brand)} alt={`${props.brand} Logo`} />
      <p className='pt-3'>
        Descubra os modelos da {props.brand} em destaque.
      </p>
    </div>
    {
      props.productsIds.map(productId =>
        <Product key={productId} id={productId} {...contentData[productId]}/>)
    }
  </ContentTemplate>
