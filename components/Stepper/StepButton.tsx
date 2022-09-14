import classes from './index.module.scss'
import cn from 'classnames'
import { ReactNode } from 'react'

export interface StepButtonProps {
  active?: boolean
  complete?: boolean,
  className?: string,
  children?: ReactNode
}

export const StepButton = (props: StepButtonProps): JSX.Element => {
  const stepButtonCn = cn(classes.stepButton,
    props.active && classes.stepButton__active,
    props.complete && classes.stepButton__complete)

  return (
    <button
      className={
        `${props.className ?? ''} ${stepButtonCn} btn rounded-circle`
      }
    >{props.children}</button>
  )
}
