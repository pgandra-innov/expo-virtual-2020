import { ReactNode, useEffect } from 'react'
import IndexTemplate, { LeftContentTemplate } from '../../PageTemplates/Index'
import { StepButton } from '../../Stepper/StepButton'
import classes from './index.module.scss'
import Link from 'next/link'
import { ZonesOverview } from '../../ZonesOverview'
import { useAppState } from '../../../data/appState'
import { resetStep } from '../../Stepper'
import { hideVideoLinks } from '../../VideoContainer'

interface LabelProps {
  top: number
  left: number
  zone: number
  children: ReactNode
}

const Label = (props: LabelProps): JSX.Element =>
  <Link href={`/zone/${props.zone}`}>
    <a
      onClick={() => {
        // setState(state => resetStep(state))
      }}
      className={`${classes.label} d-flex text-decoration-none align-items-center position-absolute`}
      style={{ top: `${props.top}%`, left: `${props.left}%` }}
    >
      <StepButton active className={`${classes.indexStepButton} d-flex align-items-center justify-content-center p-3 mr-3`}>
        {props.zone}
      </StepButton>
      {props.children}
    </a>
  </Link>

export const HomeTemplate = (): JSX.Element => {
  const [state, setState] = useAppState()

  useEffect(() => {
    setState(state => {
      hideVideoLinks(state)
      resetStep(state)
    })
  }, [state.zone.step])

  return (
    <IndexTemplate
      centerContent={
        <ZonesOverview>
          <Label top={0} left={21} zone={1}>Sala<br/>de Reuniões</Label>
          <Label top={3} left={36} zone={2}>Equipamentos<br/>Dentários</Label>
          <Label top={12} left={60.5} zone={3}>Consumíveis</Label>
          <Label top={17.5} left={73} zone={4}>Esterilização<br/>e Equipamentos Acessórios</Label>
          <Label top={25.5} left={88} zone={5}>Engenharia<br/>e Serviços</Label>
          <Label top={65} left={78} zone={6}>Equipamentos<br/>CAD/CAM</Label>
          <Label top={60} left={16} zone={7}>Imagiologia</Label>
        </ZonesOverview>
      }
      rightContent={
        <></>
      }
      leftContent={
        <LeftContentTemplate>
          <div className='row'>
            <div className="col-10 offset-2 pt-3">
              <p className='pb-1'>
                <small>
                  Navegue entre as diversas zonas da exposição, seleccionando a zona correspondente.
                </small>
              </p>
            </div>
          </div>
        </LeftContentTemplate>
      }
      footerContent={
        false
      }
    />
  )
}
