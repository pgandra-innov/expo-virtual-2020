import { HTMLProps } from 'react'
import classes from './index.module.scss'

export const ProductHeader = (props: HTMLProps<HTMLHeadingElement>): JSX.Element =>
  <h4 {...props} className={`${props.className ?? ''} ${classes.header}`} />
