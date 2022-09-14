import { ReactNode } from 'react'
interface Props {
  children?: ReactNode
}

export const ZonesOverview = (props: Props): JSX.Element =>
  <div className="h-100 w-100 position-relative d-flex align-items-center">
    <div className="d-flex position-relative w-100">
      <img className='w-100' src='/images/inicial-bg.png' alt='Inicial' />
      <div className='w-100 h-100 position-absolute' style={{ top: 0, left: 0, zIndex: 1 }}>
        {props.children}
      </div>
    </div>
  </div>
