import { useRouter } from 'next/router'
import { IndexAllTemplate } from '..'
import { DisplayType } from '../../components/DisplayType'
import { MobileTemplate } from '../../components/PageTemplates/Mobile'
import { NotFound } from '../../components/PageTemplates/NotFound'
import { getRoute } from '../../data/getNumberQuery'
import { zoneBrands, zoneTitles } from '../../data/zoneData'
import classes from './index.module.scss'
import { Divider } from 'semantic-ui-react'
import Carousel from 'react-bootstrap/Carousel'
import { RoundedButton } from '../../components/RoundedButton'
import { brandImage } from '../../data/contentData'
import { ClearAnchor } from '../../components/CustomLink'
import Link from 'next/link'
import { zoneLink } from '../../components/PageTemplates/Zone/Zone'

interface RouteProps {
  routeNumber: number
}

const RouteZones = [
  [],
  [1, 2, 3, 4, 5],
  [6],
  [7]
]

interface ZoneBrandListProps {
  zone: number
}

const ZoneBrandList = (props: ZoneBrandListProps): JSX.Element => {
  const brands = zoneBrands[props.zone]

  if (brands?.length === 0) return <></>

  return (
    <>
      <Divider />
      <p className='fs-1_8'>
        Marcas em exposição:
      </p>
      <div className='row'>
        {
          brands.map(brand =>
            <div className='col-6 p-4' key={brand}>
              <img className='mw-100' src={brandImage(brand)} alt={brand} />
            </div>)
        }
      </div>
    </>
  )
}

const RouteRoundedButton = (props: { zone: number }): JSX.Element =>
  <Link href={zoneLink(props.zone)}>
    <ClearAnchor>
      <RoundedButton
        outlined
        className={`${classes.roundedButton} w-100`}
        text={`Ir à Zona ${props.zone}`}
      />
    </ClearAnchor>
  </Link>

const Mobile = (props: RouteProps): JSX.Element => {
  const router = useRouter()
  const zones = RouteZones[props.routeNumber]
  return (
    <MobileTemplate>
      <div className='pl-2' role='button' onClick={() => router.back()}>
        <span className='fs-2_4 lh-1'>&lsaquo;</span>
        <span className={`${classes.backButtonText} fs-1 position-relative pl-2`}>
          VOLTAR AO INÍCIO
        </span>
      </div>
      <div className={`${classes.routeImageContainer} mt-2`}>
        <img className='w-100' src={`/images/route_${props.routeNumber}.png`} />
      </div>
      <div>
        <h2>Percurso {props.routeNumber}</h2>
        <p>
          {zones.map((zoneNumber, index) =>
            <span key={zoneNumber}>
              {index !== 0 ? ', ' : ''}{zoneTitles[zoneNumber].text.trim()}
            </span>
          )}
        </p>
      </div>
      <Divider />
      <div className={classes.carouselContainer}>
        {
          zones.length <= 1
            ? (
              <div className={classes.carouselSlide}>
                <p className='fs-1_2 font-weight-bold'>
                  Zona {zones[0]}
                </p>
                <p
                  className='fs-2 pre-line'
                  dangerouslySetInnerHTML={{ __html: zoneTitles[zones[0]].text.trim() }}
                />
                <ZoneBrandList zone={zones[0]} />
                <RouteRoundedButton zone={zones[0]} />
              </div>)
            : (
              <Carousel
                defaultActiveIndex={0}
                nextIcon={null}
                prevIcon={null}
              >
                {
                  zones.map(zone =>
                    <Carousel.Item key={zone}>
                      <div className={classes.carouselSlide}>
                        <p className='fs-1'>
                          Zona {zone}
                        </p>
                        <p
                          className='fs-2 pre-line'
                          dangerouslySetInnerHTML={{ __html: zoneTitles[zone].text.trim() }}
                        />
                        <ZoneBrandList zone={zone} />
                        <RouteRoundedButton zone={zone} />
                      </div>
                    </Carousel.Item>
                  )
                }
              </Carousel>)
        }
      </div>
    </MobileTemplate>
  )
}

export default function Route (): JSX.Element {
  const route = getRoute(useRouter())
  return route === -1
    ? <NotFound />
    : <DisplayType
      Mobile={() => <Mobile routeNumber={route} />}
      All={IndexAllTemplate}
    />
}
