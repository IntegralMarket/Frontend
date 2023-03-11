import { FC, useEffect, useState } from 'react'

import ToggleLink from './ToggleLink/ToggleLink'
import DefaultLink from './DefaultLink/DefaultLink'

import { DesktopLink } from './types'
import { getToggleLinks, handleToggle } from './helpers'
import { homeLink, otherLinks } from './constants'

import { useGetCategory } from 'shared/hooks'

import s from './LinkTree.module.scss'

interface LinkTreeProps {
  toggleMenu: () => void
}

const LinkTree: FC<LinkTreeProps> = ({ toggleMenu }) => {
  const [links, setLinks] = useState<DesktopLink[]>([])

  const [category] = useGetCategory()

  useEffect(() => {
    const polymersLinks = getToggleLinks('Polymers', category?.product_types)
    setLinks(homeLink.concat(polymersLinks).concat(otherLinks))
  }, [category])

  return (
    <div className={s.linkTree}>
      {links.map(
        (link, index) =>
          link.isShow && (
            <div key={index} style={{ paddingLeft: `${40 * link.depth}px` }}>
              {'isToggled' in link ? (
                <ToggleLink
                  linkElement={link}
                  isBiggerShift={
                    link.isToggled && links[index + 1].type === 'link'
                  }
                  onClick={() => setLinks(handleToggle(links, link.name))}
                />
              ) : (
                <DefaultLink
                  linkElement={link}
                  additionalOnClick={toggleMenu}
                />
              )}
            </div>
          )
      )}
    </div>
  )
}

export default LinkTree
