import classes from './index.module.scss'

interface Props {
  category: string
  categoryClassName?: string
  name: string
  nameClassName?: string
}

export const ProductTitle = (props: Props): JSX.Element =>
  <>
    <span className={`${classes.productCategory} ${props.categoryClassName ?? ''}`}>{props.category}</span>
    <span className={`${classes.productName} ${props.nameClassName ?? ''}`}>{props.name}</span>
  </>
