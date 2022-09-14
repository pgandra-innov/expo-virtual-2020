import { useRouter } from 'next/router'
import { FC } from 'react'
import { ContentIdType } from '../data/contentData'
import { getContentLink } from '../data/getContentLink'
import { getZone } from '../data/getNumberQuery'
import { CustomLink } from './CustomLink'
import { RoundedButtonProps } from './RoundedButton'

interface Props {
  ButtonComponent: FC<RoundedButtonProps>
  talkToUsId: ContentIdType
}

export const TalkToUsButton = ({ ButtonComponent, talkToUsId }: Props): JSX.Element =>
  <CustomLink
    href={getContentLink(talkToUsId, getZone(useRouter()))}
    aProps={{ className: 'w-100' }}
  >
    <ButtonComponent icon='local_phone' text='Fale connosco' />
  </CustomLink>
