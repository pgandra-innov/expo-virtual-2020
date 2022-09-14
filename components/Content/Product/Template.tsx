import { LinksImageContent } from '../../../data/contentData'
import { RoundedButton, RoundedButtonProps } from '../../RoundedButton'
import classes from './index.module.scss'
import { ProductHeader } from './Header'
import { ContentTemplate } from '../Template/Template'
import { ReactNode } from 'react'
import { ContactButtons } from './ContactButtons'
import { setOpenVideo } from '../../VideoModal'
import { useAppState } from '../../../data/appState'

export const ProductRoundedButton = (props: RoundedButtonProps): JSX.Element =>
  <RoundedButton {...props} />

interface Props extends LinksImageContent {
  title?: ReactNode
  showSpecialPriceBadge?: boolean
}

interface LinkProps {
  href: string
  children: ReactNode
}

const Link = (props: LinkProps) =>
  <a href={props.href} target='_blank' rel='noreferrer' className='text-decoration-none text-dark'>
    {props.children}
  </a>

export const ProductContentTemplate = (props: Props): JSX.Element => {
  const [, setState] = useAppState()
  const { linkVideo } = props
  return (
    <ContentTemplate>
      <div className='d-flex flex-column justify-content-between w-100 pt-3'>
        {
          props.title
        }
        <div className='row'>
          <div className={`d-flex justify-content-center align-items-center ${props.showSpecialPriceBadge ? 'col-6' : 'col-12'}`}>
            <img className={classes.productImage} src={props.image} alt={props.imageAlt}/>
          </div>
          {
            props.showSpecialPriceBadge &&
              <div className='d-flex col-6 justify-content-center align-items-center'>
                <img src='/content/icons/priceBadge.png' alt='Preço Especial Expodentária Virtual OMD 2020' />
              </div>
          }
        </div>
      </div>
      <ProductHeader className='pt-5'>
        {props.heading}
      </ProductHeader>
      <p
        className={`${classes.description} pt-3`}
        dangerouslySetInnerHTML={{ __html: props.description.trim() }}
      />
      {
        props.actionButtons &&
        <div className='d-flex justify-content-between pt-5'>
          {
            props.actionButtons?.map(actionButton =>
              <Link key={actionButton.link} href={actionButton.link}>
                <RoundedButton actionButton text={actionButton.text} />
              </Link>)
          }
        </div>
      }
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
          <div role='button' className='d-flex pt-2' onClick={() => setState(setOpenVideo(linkVideo))}>
            <i className="material-icons-outlined">play_circle_outline</i>&nbsp; Ver vídeo
          </div>
      }
      {
        props.linkBrochure &&
          <Link href={props.linkBrochure}>
            <div className='d-flex pt-2'>
              <i className="material-icons-outlined">picture_as_pdf</i>&nbsp; Descarregar mais informações
            </div>
          </Link>
      }
      <ContactButtons />
    </ContentTemplate>
  )
}
