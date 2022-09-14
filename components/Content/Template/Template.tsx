import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useAppState } from '../../../data/appState'
import { ExitIcon } from '../../ExitIcon'
import { closeSidebar } from '../../Sidebar'
import classes from './Template.module.scss'

interface Props {
  children: ReactNode
  onExitClick?: () => void
  onExitRouteBack?: boolean
}

export const ContentTemplate = (props: Props): JSX.Element => {
  const [, setState] = useAppState()
  const router = useRouter()

  const onExitClick = props.onExitClick ??
    props.onExitRouteBack
    ? () => { router.back() }
    : () => { setState(closeSidebar) }

  return (
    <div className={`${classes.container} row p-4`}>
      <div className='col-10 d-flex flex-column'>
        {props.children}
      </div>
      <div className='col-2 d-flex justify-content-center align-items-center'>
        <ExitIcon onClick={onExitClick} />
      </div>
    </div>
  )
}
