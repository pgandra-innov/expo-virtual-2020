import produce from 'immer'
import { atom, useRecoilState } from 'recoil'

/**
 * Used to select which components to load depending on page size
 */
export enum DisplayTypes {
  None,
  All,
  Mobile
}

const defaultAppState = {
  displayType: DisplayTypes.None,
  sidebar: {
    open: false,
    content: ''
  },
  zone: {
    step: 0
  },
  showVideoLinks: false,
  openVideo: '',
  message: {
    emailTo: ''
  }
}

const appState = atom({
  key: 'appState',
  default: defaultAppState
})

export type AppState = typeof defaultAppState
type Producer = (state: AppState) => void
type AppStateSetter = (producer: Producer) => void

/**
 * Hook to access and subscribe to app state.
 * setState receives a function that modifies state as if it was mutable.
 * Immer takes care of creating a new state, and not actually mutating the old one.
 * Eg: setState(state => { state.showVideoLinks = true })
 */
export const useAppState = (): [AppState, AppStateSetter] => {
  const [state, setState] = useRecoilState(appState)
  const setAppState = (producer: Producer) => { setState(produce(producer)) }
  return [state, setAppState]
}
