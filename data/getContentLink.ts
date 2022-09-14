import { zoneLink } from '../components/PageTemplates/Zone/Zone'
import { ContentIds, ContentIdType } from './contentData'

/**
 * Useful for when navigating back, setting the correct URL.
 * @param contentId To which content page the link should navigate
 * @param zone If there's a zone page open, set its zone number in link path
 */
export const getContentLink = (contentId: ContentIdType, zone?: number): string =>
  `${zone ? zoneLink(zone) : '/home'}/content/${contentId}`

type LinkGetter = (zone?: number) => string

export const getMessageLink: LinkGetter = zone => getContentLink('message', zone)

/**
 * Which talkToUs content should load for each zone page
 */
const zoneTalkToUsId = [
  /* Initial */ ContentIds.talkToUs02,
  /* Zone 1 */ ContentIds.talkToUs01,
  /* Zone 2 */ ContentIds.talkToUs02,
  /* Zone 3 */ ContentIds.talkToUs03,
  /* Zone 4 */ ContentIds.talkToUs02,
  /* Zone 5 */ ContentIds.talkToUs04,
  /* Zone 6 */ ContentIds.talkToUs05,
  /* Zone 7 */ ContentIds.talkToUs02
]

export const getTalkToUsLink: LinkGetter = (zone = -1) => getContentLink(
  zone === -1 ? ContentIds.talkToUs03 : zoneTalkToUsId[zone], zone)
