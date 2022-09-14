import { NextRouter, useRouter } from 'next/router'
import { HTMLProps, PropsWithChildren, ReactNode } from 'react'
import { getTalkToUsLink } from '../../../data/getContentLink'
import { getZone } from '../../../data/getNumberQuery'
import { isValidContentId } from '../../../data/isValidContentId'
import { CustomLink } from '../../CustomLink'
import classes from './index.module.scss'

enum MenuIcons {
  Menu = 'menu',
  News = 'article',
  Chat = 'textsms',
  Contact = 'call',
  Share = 'share'
}

interface MenuIconProps {
  icon?: MenuIcons
  circled?: boolean
  blank?: boolean
  href?: string
  onClick?: () => void
}

const MenuButton = (props: MenuIconProps) => {
  const Container = !props.href
    ? (props: PropsWithChildren<HTMLProps<HTMLDivElement>>) => <div {...props} />
    : ({ children, className, onClick }: PropsWithChildren<{ className: string, onClick?: () => void }>) =>
      <CustomLink aProps={{ className, onClick }} href={props.href as string} >{children}</CustomLink>

  return (
    <Container
      onClick={props.onClick}
      className={`${classes.menuButton} col d-flex align-items-center justify-content-center p-0`}
    >
      {
        !props.blank &&
          <div className={`
            d-flex align-items-center justify-content-center p-3 
            ${props.circled ? `${classes.menuButtonCircle} rounded-circle` : ''}
          `}>
            <i className={`${classes.menuButtonIcon} material-icons`}>{props.icon}</i>
          </div>
      }
    </Container>
  )
}

const openMobileShare = (router: NextRouter): void => {
  if (navigator.share) {
    const contentId = router.query.content
    navigator.share({
      title: 'Showroom Virtual 2020 | Montellano',
      text: '',
      url: 'https://showroomvirtual.montellano.pt/' +
        (isValidContentId(contentId) ? `home/content/${contentId}` : '')
    })
  }
}

const Menu = (): JSX.Element => {
  const router = useRouter()
  return (
    <div className={`${classes.menu} row p-0 m-0`}>
      <MenuButton href={getTalkToUsLink(getZone(router))} icon={MenuIcons.Contact} />
      <MenuButton href='/home/content/news' icon={MenuIcons.News} />
      <MenuButton onClick={() => openMobileShare(router)} icon={MenuIcons.Share} />
      <MenuButton blank />
      <MenuButton blank />
      <MenuButton blank />
      <MenuButton blank />
    </div>
  )
}

interface Props {
  withoutMenu?: boolean
  underContent?: ReactNode
}

export const MobileTemplate = (props: PropsWithChildren<Props>): JSX.Element =>
  <div className={`${classes.container} d-flex flex-column text-white`}>
    <div className={`${classes.content} d-flex flex-column`}>
      <CustomLink href='/home'>
        <div className={`${classes.logoContainer} pl-4`}>
          <img width='200' src='/images/LOGO_Horizontal_WhiteTransparent.png' alt='Logo Montellano' />
        </div>
      </CustomLink>
      <div className='row pl-5 pr-5 pb-5'>
        <div className='col d-flex flex-column w-100'>
          {props.children}
        </div>
      </div>
      {
        props.underContent &&
          <div className='row pl-0 pr-0 flex-grow-1'>
            <div className='col p-0 d-flex flex-column'>
              {props.underContent}
            </div>
          </div>
      }
    </div>
    {
      !props.withoutMenu && <Menu />
    }
  </div>
