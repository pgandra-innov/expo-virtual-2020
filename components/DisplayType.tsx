import { useEffect } from 'react'
import { DisplayTypes, useAppState } from '../data/appState'

interface Props {
  Mobile: () => JSX.Element
  All: () => JSX.Element
}

const mobileMaxWidth = '700px'

export const DisplayTypeUpdater = (): JSX.Element => {
  const [, setState] = useAppState()

  const updateDisplayType = (isMobile: MediaQueryList) => {
    setState(state => {
      state.displayType = isMobile.matches ? DisplayTypes.Mobile : DisplayTypes.All
    })
  }

  useEffect(() => {
    const isMobile = window.matchMedia(`(max-width: ${mobileMaxWidth})`)
    updateDisplayType(isMobile)
    isMobile.addEventListener('change', () => updateDisplayType(isMobile))
    return () => {
      isMobile.removeEventListener('change', () => updateDisplayType(isMobile))
    }
  }, [])

  return <></>
}

export const DisplayType = ({ All, Mobile }: Props): JSX.Element => {
  const [state] = useAppState()
  switch (state.displayType) {
    case DisplayTypes.All: return <All />
    case DisplayTypes.Mobile: return <Mobile />
    default: return <></>
  }
}
