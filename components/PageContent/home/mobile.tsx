import Link from 'next/link'
import { MobileTemplate } from '../../PageTemplates/Mobile'

interface CircleLinkProps {
  /** Route number for link URL */
  route: number
  /** Top position in %, relative to parent element */
  top: number
  /** Left position in %, relative to parent element */
  left: number
}

const CircleLink = (props: CircleLinkProps): JSX.Element =>
  <Link href={`/route/${props.route}`}>
    <a
      className='
        position-absolute d-flex align-items-center justify-content-center
        rounded-circle pt-3 pb-3 pl-4 pr-4
      '
      style={{ top: `${props.top}%`, left: `${props.left}%` }}
    >&nbsp;</a>
  </Link>

interface RectangleLinkProps extends CircleLinkProps {
  /** Width of link area in px */
  width: number
  /** Height of link area in px */
  height: number
  /** Rotation of link area in deg */
  rotate: number
}

const RectangleLink = (props: RectangleLinkProps): JSX.Element =>
  <Link href={`/route/${props.route}`}>
    <a
      className='position-absolute'
      style={{
        top: `${props.top}%`,
        left: `${props.left}%`,
        width: props.width,
        height: props.height,
        transform: `rotate(${props.rotate}deg)`
      }}
    ></a>
  </Link>

export const HomeMobile = (): JSX.Element => {
  return (
    <MobileTemplate>
      <div className='border-left text-white pl-2'>
        <span className='fs-1'>
          SHOWROOM VIRTUAL 2022
        </span>
      </div>
      <div className='mt-5 position-relative'>
        <img className='w-100' src='/images/zones_mobile.png' useMap="#routes_map" />
        <CircleLink route={1} top={0} left={65} />
        <RectangleLink route={1} top={16} left={19} width={205} height={48} rotate={16}/>
        <CircleLink route={2} top={87} left={76} />
        <RectangleLink route={2} top={46} left={46} width={110} height={64} rotate={24}/>
        <CircleLink route={3} top={64} left={14} />
        <RectangleLink route={3} top={32} left={6} width={90} height={54} rotate={30}/>
      </div>
      <h5 className='text-light mt-5'>
        Toque no percurso que pretente conhecer, e descubra as diversas zonas da exposição.<br />
        <br />
        Para uma experiência web mais optimizada, sugerimos que consulte este showroom a partir de um computador.<br />
        <br />
        Se pretender falar connosco, também poderá utilizar o chat, em baixo.
      </h5>
    </MobileTemplate>
  )
}
