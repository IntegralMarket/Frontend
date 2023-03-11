import { ImageProps } from 'next/image'
import { BASE_DOMAIN } from 'shared/constants'

export const convertLink = (link: string | null): string => {
  if (!link) return ''
  if (link.match('http')) return link
  return `https://${link}`
}

export const withDomain = (image?: ImageProps['src']): ImageProps['src'] => {
  if (!image) return ''
  return typeof image === 'string' && !image.includes(BASE_DOMAIN)
    ? BASE_DOMAIN + image
    : image
}

export const withDomainLink = (image: string): string => {
  return typeof image === 'string' && !image.includes(BASE_DOMAIN)
    ? BASE_DOMAIN + '/' + image
    : image
}

export const flagLoader = (country?: string) => {
  return `https://countryflagsapi.com/svg/${
    country === 'UAE' ? 'AE' : country || 'AQ'
  }`
}
