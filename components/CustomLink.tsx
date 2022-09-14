import Link, { LinkProps } from 'next/link'
import { forwardRef, HTMLProps, PropsWithChildren, PropsWithRef } from 'react'

type AnchorProps = PropsWithRef<HTMLProps<HTMLAnchorElement>>

interface Props {
  href: string
  aProps?: AnchorProps
  linkProps?: LinkProps
}

const _ClearAnchor = ({ className, ...props }: AnchorProps = {}): JSX.Element =>
  <a role='button' className={`${className ?? ''} text-decoration-none text-dark`} {...props}>
    {props.children}
  </a>

export const ClearAnchor = forwardRef(_ClearAnchor)

export const CustomLink = (props: PropsWithChildren<Props>): JSX.Element =>
  <Link {...props.linkProps} href={props.href} passHref>
    <ClearAnchor {...props.aProps}>
      {props.children}
    </ClearAnchor>
  </Link>
