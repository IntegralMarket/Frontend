import { Meta } from 'shared/types'
import { CategoryDetail } from 'shared/types/categories'
import { DesktopLink } from './types'

export const handleToggle = (links: DesktopLink[], name: string) => {
  const newLinks = [...links]
  const targetElementIdx = newLinks.findIndex(
    linkElement => linkElement.name === name
  )

  const targetElement = newLinks[targetElementIdx]
  const { isToggled: targetIsToggled, depth: targetDepth } = targetElement

  const targetCurrentIsToggled = !targetIsToggled
  targetElement.isToggled = targetCurrentIsToggled

  for (let i = targetElementIdx + 1; i < newLinks.length; i++) {
    const currentElement = newLinks[i]
    const { depth: currentDepth } = currentElement

    if (currentDepth <= targetDepth) break

    if (targetCurrentIsToggled) {
      if (currentDepth === targetDepth + 1) currentElement.isShow = true
      if (currentDepth === targetDepth + 1 && 'isToggled' in currentElement)
        currentElement.isToggled = false
    } else {
      currentElement.isShow = false
      if ('isToggled' in currentElement) currentElement.isToggled = false
    }
  }

  return newLinks
}

export const getToggleLinks = (
  label: string,
  types: CategoryDetail['product_types'] | undefined
): DesktopLink[] => {
  if (!types) return []

  const toggleLink: DesktopLink = {
    type: 'toggle',
    isToggled: false,
    name: label,
    depth: 0,
    isShow: true,
  }

  const innerLink = ({ id, name }: Meta): DesktopLink => {
    return {
      type: 'link',
      link: `/polymers?product_type_id__in=${id}`,
      name: name,
      depth: 1,
      isShow: false,
    }
  }

  return [toggleLink].concat(types.map(item => innerLink(item)))
}
