import { ParsedUrlQuery } from 'querystring'
import { contentData, ContentIdType } from './contentData'

type ValueOf<T> = T[keyof T]

export const isValidContentId = (contentId: ValueOf<ParsedUrlQuery>): contentId is ContentIdType =>
  Object.prototype.hasOwnProperty.call(contentData, String(contentId))
