import Link from 'next/link'
import { brandImageDark, Product } from '../../../data/contentData'
import { ClearAnchor } from '../../CustomLink'
import { Centered } from '../../MobileCentered'
import classes from '../../PageTemplates/Zone/mobile.module.scss'
import { ContactButtons } from './ContactButtons'

export const ProductMobileContent = (props: Product): JSX.Element => {
  const { linkVideo } = props
  return (
    <>
      <Centered className='pt-4'>
        <div>
          <img src={brandImageDark(props.brand)} alt={props.brand} />
        </div>
      </Centered>
      <Centered wide className='pt-5 pb-4'>
        <img
          className={`${classes.contentImage} mw-100`}
          src={props.image}
          alt={props.imageAlt}
        />
      </Centered>
      <Centered className={classes.contentDataContainer}>
        <h4 className={classes.contentCategory}>
          {props.category}
        </h4>
        <h2 className={classes.contentName}>
          {props.name}
        </h2>
        <h3 className={classes.contentHeading}>
          {props.heading}
        </h3>
        <p
          className='pre-line fs-1_2'
          dangerouslySetInnerHTML={{ __html: props.description }}
        />
        {
          props.linkSite &&
            <Link href={props.linkSite}>
              <div className='d-flex pt-4'>
                <i className="material-icons-outlined">exit_to_app</i>&nbsp; Visitar site
              </div>
            </Link>
        }
        {
          linkVideo &&
            <ClearAnchor href={`https://www.youtube.com/watch?v=${props.linkVideo}`} target='_blank'>
              <div role='button' className='d-flex pt-2'>
                <i className="material-icons-outlined">play_circle_outline</i>&nbsp; Ver vídeo
              </div>
            </ClearAnchor>
        }
        {
          props.linkBrochure &&
            <Link href={props.linkBrochure}>
              <div className='d-flex pt-2'>
                <i className="material-icons-outlined">picture_as_pdf</i>&nbsp; Descarregar mais informações
              </div>
            </Link>
        }
        <ContactButtons column />
      </Centered>
    </>
  )
}
