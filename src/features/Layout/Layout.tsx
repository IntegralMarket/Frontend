import { FC, ReactNode } from 'react'
import { useRouter } from 'next/router'

import { CommonLayout } from './CommonLayout'
import {
  withBreadCrumbsNoSearchPaths,
  withBreadCrumbsAndBrightLayoutPaths,
  withBreadCrumbsAndRedFooterPaths,
  withBrightLayoutPaths,
  withBreadCrumbsAndLazurFooterPaths,
} from './utils'

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter()

  const findPath = (element: string) => {
    return router.pathname.startsWith(element)
  }

  if (withBreadCrumbsAndLazurFooterPaths.find(findPath)) {
    return (
      <CommonLayout withBreadCrumbs variant={'lazur'}>
        {children}
      </CommonLayout>
    )
  }

  if (withBreadCrumbsNoSearchPaths.find(findPath)) {
    return <CommonLayout withBreadCrumbs>{children}</CommonLayout>
  }

  if (withBreadCrumbsAndBrightLayoutPaths.find(findPath)) {
    return (
      <CommonLayout bright withBreadCrumbs withSearch>
        {children}
      </CommonLayout>
    )
  }

  if (withBreadCrumbsAndRedFooterPaths.find(findPath)) {
    return (
      <CommonLayout bright withBreadCrumbs withSearch variant={'accent'}>
        {children}
      </CommonLayout>
    )
  }

  if (withBrightLayoutPaths.find(findPath)) {
    return <CommonLayout bright>{children}</CommonLayout>
  }

  return <CommonLayout bright>{children}</CommonLayout>
}
