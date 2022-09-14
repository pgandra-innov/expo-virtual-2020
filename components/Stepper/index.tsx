import classes from './index.module.scss'
import cn from 'classnames'
import { StepButton, StepButtonProps } from './StepButton'
import { AppState, useAppState } from '../../data/appState'
import { StepData, zoneData } from '../../data/zoneData'
import { hideVideoLinks } from '../VideoContainer'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { getZone } from '../../data/getNumberQuery'
import { isTopZone } from '../PageTemplates/Zone/isTopZone'
import { brandImage } from '../../data/contentData'

interface StepProps extends StepButtonProps {
  onClick: () => void,
  stepData: StepData
  preComplete: boolean
}

const Step = (props: StepProps) => {
  const stepImageCn = cn(classes.stepImage, 'pb-2',
    (!props.active && !props.complete) && classes.stepImage__inactive)

  const stepRoundedPill = cn(classes.stepRoundedPill,
    props.active && classes.stepRoundedPill__active,
    props.complete && (
      props.preComplete
        ? classes.stepRoundedPill__preComplete
        : classes.stepRoundedPillComplete
    ))

  const stepLabelCn = cn(classes.stepLabel,
    props.active && classes.stepLabelActive)

  return (
    <div className={`${classes.step} d-flex flex-column `} onClick={props.onClick}>
      <div className="d-flex align-items-center pb-2">
        <StepButton className='btn-light p-2' active={props.active} complete={props.complete} />
        <div className={`rounded-pill ${stepRoundedPill}`}></div>
      </div>
      <div className="d-flex flex-column align-items-start pt-3">
        {
          props.stepData.stepLabel &&
            <span className={stepLabelCn}>
              {props.stepData.stepLabel}
            </span>
        }
        {
          props.stepData.brands && props.stepData.brands.map(brand =>
            <img key={brand} className={stepImageCn} src={brandImage(brand)} alt={`${brand} Logo`} />
          )
        }
      </div>
    </div>
  )
}

const selectStep = (router: NextRouter, step: number) => (state: AppState): undefined => {
  if (state.zone.step === step) return
  hideVideoLinks(state)

  const zone = getZone(router)

  if (isTopZone(zone)) {
    router.push(`/zone/${step + 1}`, undefined, { shallow: true })
  } else {
    state.zone.step = step
  }
}

export const resetStep = (state: AppState): void => {
  state.zone.step = 0
}

export const isFirstStepSet = (state: AppState): boolean => {
  return state.zone.step === 0
}

export const isLastStepSet = (zone:number, state: AppState): boolean => {
  return state.zone.step === zoneData[zone].length - 1
}

export const setNextStep = (router: NextRouter) => (state: AppState): undefined => {
  const zone = getZone(router)
  if (isLastStepSet(zone, state)) return
  selectStep(router, state.zone.step + 1)(state)
}

export const setPreviousStep = (router: NextRouter) => (state: AppState): undefined => {
  if (state.zone.step === 0) return
  selectStep(router, state.zone.step - 1)(state)
}

interface Props {
  zone: number
}

export const Stepper = (props: Props): JSX.Element => {
  const [state, setState] = useAppState()
  const router = useRouter()
  return (
    <div className={`${classes.stepper} row pb-3 justify-content-center align-items-start`}>
      {zoneData[props.zone].map((stepData, step) =>
        <Step
          key={`${props.zone}-${step}`}
          stepData={stepData}
          onClick={() => {
            setState(selectStep(router, step))
          }}
          active={step === state.zone.step}
          complete={step < state.zone.step}
          preComplete={state.zone.step === step + 1}
        />
      )}
      <Link href='/home'>
        <div className={`${classes.step} d-flex flex-column`}>
          <div className="d-flex align-items-center">
            <StepButton className={`${classes.exitStepButton} d-flex justify-content-center align-items-center p-2`}>
              <i className={`material-icons-outlined ${classes.exitStepButtonIcon}`}>exit_to_app</i>
            </StepButton>
          </div>
          <div className="d-flex align-items-center pt-3">
            &nbsp;
          </div>
        </div>
      </Link>
    </div>
  )
}
