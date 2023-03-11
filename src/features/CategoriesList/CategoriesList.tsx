import { FC } from 'react'
import cn from 'classnames'

import { CategoryItem, CategoryItemProps } from './CategoryItem'

import s from './CategoriesList.module.scss'

interface CategoriesListProps {
  items: CategoryItemProps[]
  className?: string
}

export const CategoriesList: FC<CategoriesListProps> = ({
  items,
  className,
}) => {
  const listClass = cn(s.wrapper, className)

  return (
    <div className={listClass}>
      {items.length
        ? items.map((item, index) => <CategoryItem key={index} {...item} />)
        : null}
    </div>
  )
}
