import { PropsWithChildren } from 'react'

interface CenteredProps {
  wide?: boolean
  className?: string
  internalClassName?: string
}

export const Centered = (props: PropsWithChildren<CenteredProps>): JSX.Element =>
  <div className={`
    ${props.className ?? ''} row m-0 
    ${props.wide ? 'pl-4 pr-4' : 'pl-5 pr-5'}
  `}>
    <div className={`${props.internalClassName} col d-flex flex-column w-100`}>
      {props.children}
    </div>
  </div>
