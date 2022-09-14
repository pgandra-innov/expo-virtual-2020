import { CustomLink } from '../../CustomLink'
import { useRouter } from 'next/router'
import { RoundedButton } from '../../RoundedButton'
import { HTMLProps } from 'react'
import { SendMessageCTA } from '../Message'
import { getTalkToUsLink } from '../../../data/getContentLink'
import { getZone } from '../../../data/getNumberQuery'

interface ContactButtonProps extends HTMLProps<HTMLDivElement> {
  column?: boolean
}

export const ContactButtons = ({ className, column, ...props }: ContactButtonProps): JSX.Element => {
  const zone = getZone(useRouter())
  return (
    <div
      className={`
        ${className} d-flex pt-4 pb-4
        ${column
          ? 'flex-column w-100'
          : 'justify-content-between'}
      `}
      {...props}
    >
      <CustomLink
        href={getTalkToUsLink(zone)}
        aProps={{
          className: !column ? '' : 'pt-3 pb-3 w-100'
        }}
      >
        <RoundedButton
          icon='local_phone'
          text='Fale Connosco'
          className={!column ? '' : 'w-100'}
        />
      </CustomLink>
      <SendMessageCTA>
        <RoundedButton
          outlined
          icon='mail'
          text='Enviar email'
          className={!column ? '' : 'w-100'}
        />
      </SendMessageCTA>
    </div>
  )
}
