import { useRouter } from 'next/router'
import IndexTemplate, { LeftContentTemplate } from '../Index'
import { isFirstStepSet, isLastStepSet, setNextStep, setPreviousStep, Stepper } from '../../Stepper'
import { hideVideoLinks, VideoContainer } from '../../VideoContainer'
import { useAppState } from '../../../data/appState'
import { getZone } from '../../../data/getNumberQuery'
import { zoneData, zoneTitles } from '../../../data/zoneData'
import { useEffect } from 'react'
import classes from './index.module.scss'
import { VideoModal } from '../../VideoModal'
import { isTopZone } from './isTopZone'

// For topZones, their number represents the step, as they're all in the same video
// To get the correct stepData, the zone number needs to be decremented
const stepForTopZone = (zone: number) => zone - 1

export const ZoneTemplate = (): JSX.Element => {
  const [state, setState] = useAppState()
  const router = useRouter()
  const zone = getZone(router)
  const steps = zoneData[zone]
  const isTopStep = isTopZone(zone)

  useEffect(() => {
    // Reset state so links don't show on next render,
    // and step is back to the first item
    setState(state => {
      hideVideoLinks(state)
      if (zone && isTopStep) state.zone.step = stepForTopZone(zone)
    })
  }, [zone])

  if (!steps || steps.length < 1) return <IndexTemplate centerContent={<h1 className='p-5' />}/>

  const zoneTitle = zoneTitles[zone]

  return (
    <IndexTemplate
      leftContent={
        <LeftContentTemplate>
          <div className='row'>
            <div className="col-10 offset-2 pt-3">
              <small>
                <strong>ZONA {zone}</strong>
              </small>
              <h3
                className={`${classes.zoneTitle} pt-3 pb-3`}
                dangerouslySetInnerHTML={{ __html: zoneTitle.text.trim() }}
              />
              {
                zoneTitle.brandImage &&
                  <div className='pb-3'>
                    <img src={zoneTitle.brandImage} alt={zoneTitle.brandImageAlt} />
                  </div>
              }
              <p className="pt-2">
                <small>
                  Seleccione os equipamentos para descobrir mais informações.
                </small>
              </p>
            </div>
          </div>
          <div className="row flex-grow-1 pt-5 pr-5 justify-content-end position-relative">
            {
              !isFirstStepSet(state) &&
                <button
                  className="position-absolute btn btn-outline-light rounded-circle d-flex p-3 justify-content-center align-items-center"
                  onClick={() => setState(setPreviousStep(router))}
                  style={{ bottom: '50px' }}
                >
                  <i className="material-icons-outlined">west</i>
                </button>
            }
          </div>
        </LeftContentTemplate>
      }
      centerContent={
        <VideoContainer
          videoLoadTime={
            !isTopStep
              // If zone is not in topZones, play video from start
              ? 0
              // Prevent having to wait long for video to play until selected step
              : zoneData[zone][stepForTopZone(zone)].videoTime - 2 || 0
          }
          zone={zone}
        />
      }
      rightContent={
        isLastStepSet(zone, state)
          ? <></>
          : <button
            className="
              position-absolute btn btn-outline-light rounded-circle d-flex p-3
              justify-content-center align-items-center
            "
            onClick={() => setState(setNextStep(router))}
            style={{ bottom: '50px' }}
          >
            <i className="material-icons-outlined">east</i>
          </button>
      }
      footerContent={
        <>
          <Stepper zone={zone} />
          <VideoModal />
        </>
      }
    />
  )
}
