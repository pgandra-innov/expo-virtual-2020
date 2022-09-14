import classes from './index.module.scss'
import cn from 'classnames'
import { HTMLProps } from 'react'

export interface RoundedButtonProps extends HTMLProps<HTMLButtonElement> {
  icon?: string
  text: string,
  outlined?: boolean
  actionButton?: boolean
}

export const RoundedButton = (props: RoundedButtonProps): JSX.Element => {
  const buttonClasses = cn(props.className, classes.button,
    props.outlined && classes.buttonOutlined,
    props.actionButton && classes.actionButton)
  return (
    <button
      onClick={props.onClick}
      className={`${buttonClasses} btn rounded-pill d-flex align-items-center justify-content-center`}
    >
      { props.icon && <><i className={`${classes.icon} material-icons-outlined`}>{props.icon}</i>&nbsp;</> }
      {props.text}
    </button>
  )
}
