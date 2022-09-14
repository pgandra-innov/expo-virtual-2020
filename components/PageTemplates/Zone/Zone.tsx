import { ContentIdType } from '../../../data/contentData'
import { DisplayType } from '../../DisplayType'
import { ZoneTemplate as ZoneAllTemplate } from '.'
import { ZoneMobileTemplate } from './mobile'

export const zoneLink = (zone: number): string => `/zone/${zone}`

export const zoneContentLink = (zone: number, contentId: ContentIdType): string =>
  `${zoneLink(zone)}/content/${contentId}`

export default function ZoneTemplate (): JSX.Element {
  return <DisplayType Mobile={ZoneMobileTemplate} All={ZoneAllTemplate} />
}
