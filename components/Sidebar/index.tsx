import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { HTMLProps, useEffect } from 'react'
import { Segment, Sidebar as SemanticSidebar } from 'semantic-ui-react'
import { AppState, useAppState } from '../../data/appState'
import { contentData, ContentTypes } from '../../data/contentData'
import { isValidContentId } from '../../data/isValidContentId'
import { getZone } from '../../data/getNumberQuery'
import { CatalogList } from '../Content/CatalogList'
import { Contact } from '../Content/Contact'
import { ProductContent } from '../Content/Product'
import { TalkToUs } from '../Content/TalkToUs'
import classes from './index.module.scss'
import { DiscountList } from '../Content/DiscountList'
import { ProductList } from '../Content/ProductList'
import { Campaign } from '../Content/Campaigns'
import KeyMirror from 'keymirror'
import { VideoList } from '../Content/VideoList'
import { InfoContent } from '../Content/Info'
import { MessageContent } from '../Content/Message'
import { OfferListContent } from '../Content/OfferList'
import { NewsDesktopList } from '../Content/News/desktopList'
import { NewsDesktopItem } from '../Content/News/desktopItem'

export const SidebarContentIds = KeyMirror({
  [ContentTypes.TalkToUs]: '',
  [ContentTypes.Message]: ''
})

export type SidebarContent = keyof typeof SidebarContentIds

export const setSidebarContent = (content: SidebarContent) =>
  (state: AppState): void => { state.sidebar.content = content }

const clearSidebarContent = (state: AppState) => { state.sidebar.content = '' }
const setSidebarOpen = (open: boolean) => (state: AppState) => { state.sidebar.open = open }

export const openSidebar = setSidebarOpen(true)
export const closeSidebar = setSidebarOpen(false)

const getContentElement = (query: ParsedUrlQuery): JSX.Element | null => {
  const contentId = String(query.content)

  if (!isValidContentId(contentId)) return null
  const content = contentData[contentId]

  switch (content.type) {
    case ContentTypes.Product: return <ProductContent {...content} />
    case ContentTypes.TalkToUs: return <TalkToUs {...content} />
    case ContentTypes.Contact: return <Contact {...content} />
    case ContentTypes.CatalogList: return <CatalogList {...content} />
    case ContentTypes.DiscountList: return <DiscountList {...content} />
    case ContentTypes.ProductList: return <ProductList {...content} />
    case ContentTypes.Campaign: return <Campaign {...content} />
    case ContentTypes.VideoList: return <VideoList {...content} />
    case ContentTypes.Info: return <InfoContent {...content} />
    case ContentTypes.Message: return <MessageContent {...content} />
    case ContentTypes.OfferList: return <OfferListContent {...content} />
    case ContentTypes.NewsList: return <NewsDesktopList {...content} />
    case ContentTypes.NewsItem: return <NewsDesktopItem {...content} />
    default: return null
  }
}

export const Sidebar = ({ className = '', ...props }: HTMLProps<HTMLElement>): JSX.Element => {
  const [state, setState] = useAppState()
  const router = useRouter()
  const contentElement = getContentElement(router.query)
  const zone = getZone(router)

  useEffect(() => {
    if (contentElement && !state.sidebar.open) setState(openSidebar)
    if (!contentElement && !props.children) setState(closeSidebar)
  }, [router.query.content])

  return (
    <SemanticSidebar
      style={props.style}
      as={Segment}
      animation='overlay'
      onHide={(event) => {
        // Only close if click was outside Sidebar content
        if (event?.target.constructor === HTMLDivElement) {
          const div = event.target as HTMLDivElement
          if (div.classList.contains('pusher')) setState(closeSidebar)
        }
      }}
      onHidden={() => {
        // If sidebar was opened from content inside a zone
        // route back to that zone's page after hiding sidebar
        if (!state.sidebar.open && zone !== -1) router.push('/zone/' + getZone(router))
        else if (!state.sidebar.open) router.back()
        setState(clearSidebarContent)
      }}
      visible={state.sidebar.open}
      direction='right'
      className={`${classes.sidebar} ${className} d-flex flex-align-center align-items-center`}
    >
      {
        contentElement ?? props.children
      }
    </SemanticSidebar>
  )
}
