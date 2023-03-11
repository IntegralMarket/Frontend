import { FC } from 'react'
import cn from 'classnames'

import ActiveLink from '../ActiveLink/ActiveLink'
import { DesktopLink } from '../types'

import s from './DefaultLink.module.scss'

interface DefaultLinkProps {
  linkElement: DesktopLink
  additionalOnClick: () => void
}

const DefaultLink: FC<DefaultLinkProps> = ({
  linkElement,
  additionalOnClick,
}) => {
  const { subtype, procmethod, link, name, depth } = linkElement

  let finalLink = '#'
  if (subtype && procmethod) {
    const polymersSubtypes = ['HDPE', 'PP', 'LDPE']
    const isProductPolymer = polymersSubtypes.includes(subtype.toUpperCase())
    const baseLink = `/products/${isProductPolymer ? 'polymers' : subtype}`

    finalLink = `${baseLink}?type=${subtype.toLowerCase()}&procmethod=${procmethod.toLowerCase()}`
  } else if (link) {
    finalLink = link
  }

  return (
    <div className={cn(s.defaultLink, depth === 0 && s.defaultLinkBigger)}>
      <ActiveLink
        href={finalLink}
        additionalClassName={cn(s.text, depth === 0 && s.textBigger)}
        activeClassName={s.textActive}
      >
        <a onClick={additionalOnClick}>{name}</a>
      </ActiveLink>
    </div>
  )
}

export default DefaultLink
