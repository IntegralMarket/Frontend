import { SelectType } from 'shared/types'

export const getUnique = (arr: string[]): string[] => Array.from(new Set(arr))
export const getUniqueByID = (arr: any[]): any[] => {
  return arr.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
}
export const filterByParams = (
  items: SelectType<string>,
  filters: SelectType<string>
): boolean => {
  // Check if has filters
  if (filters === null) return true
  const filtersArray = Array.isArray(filters) ? filters : [filters]
  if (filtersArray.length === 0) return true

  //Check if has items
  if (items === null) return false
  const itemsArray = Array.isArray(items) ? items : [items]
  if (itemsArray.length === 0) return false

  //Find comparison
  return itemsArray.some(el => filtersArray.indexOf(el) > -1)
}
