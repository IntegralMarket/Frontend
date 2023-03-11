import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'
import search_default from '/public/assets/img/search-normal.svg'
import search_blue from '/public/assets/img/search-blue.svg'

import s from './Search.module.scss'
import cn from 'classnames'
import { CountBadge } from 'components'
import { useClickOutside } from 'shared/hooks'

interface SearchProps {
  value: string
  onChange: (e: string) => void
}

export const Search: FC<SearchProps> = ({ onChange, value }) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const ref = useRef<any>()
  const searchRef = useRef<any>()
  useClickOutside(searchRef, () => {
    setIsOpen(false)
  })
  useEffect(() => {
    isOpen && ref.current?.focus()
  }, [isOpen])

  return <CountBadge count={value !== '' && !isOpen ? 1 : 0} >
    <div
      ref={searchRef}
      className={cn(
        s.searchWrapper,
        { [s.open]: isOpen },
        { [s.closed]: isOpen === false }
      )}
    >
      <div className={s.input}>
        <input
          ref={ref}
          type='text'
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
      <Image
        src={isOpen ? search_default : search_blue}
        alt={''}
        className={s.searchIcon}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      />
    </div>
  </CountBadge>

}
