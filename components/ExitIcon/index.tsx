import { HTMLProps } from 'react'
import classes from './index.module.scss'

export const ExitIcon = ({ className = '', ...props }: HTMLProps<HTMLDivElement>): JSX.Element =>
  <i {...props} className={`${className} ${classes.exitIcon} material-icons-outlined`}>cancel</i>
