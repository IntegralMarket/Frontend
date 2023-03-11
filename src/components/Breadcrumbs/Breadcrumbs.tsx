import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { Button, Icon, Search } from 'components'

import { CrumbType } from './types'
import { dictionary } from './utils'

import { capitalize } from 'shared/helpers/capitalize'
import { useAppSelector } from 'shared/hooks'

import s from './Breadcrumbs.module.scss'

interface BreadcrumbsProps {
  withSearch?: boolean
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ withSearch }) => {
  const { nameAsId, productNameAsId, type, method } = useAppSelector(
    state => state.crumbs
  )

  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [crumbs, setCrumbs] = useState<CrumbType[]>([])
  const handleOpen = () => setIsOpen(prev => !prev)

  const getTextFromHref = (subpath: string): string =>
    dictionary[subpath]
      ? dictionary[subpath]
      : capitalize(
        subpath
          .replace('[id]', nameAsId || '...')
          .replace('[productId]', productNameAsId || '...')
          .replace('[offerId]', nameAsId || ' ')
          .replace('[bidId]', nameAsId || ' ')
          .replace(/_/g, ' ')
      )

  useEffect(() => {
    const getCrumbs = (): CrumbType[] => {
      const route = router.asPath.replace(/\?.*/gi, '')
      const queries = router.asPath.match(/\?.*/gi)?.[0].slice(1).split(/\&/)

      const routesPath = router.asPath.replace(/\?.*/gi, '').slice(1).split('/')
      const routesNext = router.pathname.slice(1).split('/')
      const excludes = (subpath: string) => {
        const exludePaths = ['offer', '[offerId]', '[bidId]', 'bid']
        return !exludePaths.includes(subpath)
      }
      const crumbRoutes = routesNext.filter((subpath) => excludes(subpath)).map((subpath, index) => { // TODO refactor
        return {
          href: '/' + routesPath.slice(0, index + 1).join('/'),
          text: getTextFromHref(subpath),
        }
      })

      const queryRoutes =
        queries
          ?.map((subpath, index) => {
            return {
              href: route + '?' + queries.slice(0, index + 1).join('&'),
              text: subpath
                .replace(
                  /product_type_id__in\=(\d+,%20)+\d+/gi,
                  'Several types'
                )
                .replace(/product_type_id__in\=\d+/gi, type || '...')
                .replace(
                  /processing_method_id__in\=(\d+,%20)+\d+/gi,
                  'Several methods'
                )
                .replace(/processing_method_id__in\=\d+/gi, method || '...')
                .replace(
                  /^[a-zA-Z_].*?\=[a-zA-Z\d\_\-\%\,\.\%]+/gi,
                  'extraQuery'
                ),
            }
          })
          .filter(query => query.text !== 'extraQuery') || []

      return [{ href: '/', text: 'Home' }, ...crumbRoutes, ...queryRoutes]
    }
    setCrumbs(getCrumbs())
  }, [router.asPath, router.query.id, nameAsId, productNameAsId, type, method])

  return (
    <div className={s.wrapper}>
      <ul className={s.breadcrumbsList}>
        {crumbs.map((crumb, index) => (
          <li key={index} className={s.breadcrumbsItem}>
            {index !== crumbs.length - 1 ? (
              <Link href={crumb.href}>
                <a>{crumb.text}</a>
              </Link>
            ) : (
              <span>{crumb.text}</span>
            )}
          </li>
        ))}
      </ul>
      {withSearch && (
        <>
          <Button onClick={handleOpen} className={s.searchButton}>
            <span>
              <Icon variant='globalSearch' />
            </span>
          </Button>
          <Search isOpen={isOpen} onClose={handleOpen} />
        </>
      )}
    </div>
  )
}
