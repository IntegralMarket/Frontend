import React, { FC } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

interface ActiveLinkProps {
  children: JSX.Element | JSX.Element[]
  additionalClassName: string
  activeClassName: string
  href: string
  as?: string
}

const ActiveLink: FC<ActiveLinkProps> = ({
  children,
  additionalClassName,
  activeClassName,
  ...props
}) => {
  const { asPath } = useRouter()
  const child = React.Children.only(children)
  const childClassName = additionalClassName || ''

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink
