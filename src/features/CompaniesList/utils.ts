import { SelectOption } from 'shared/types'

import {
  CompanyType,
  FiltersObject,
  SelectOptionsObject,
  StateOptionsObject,
} from './types'
import { getUnique, filterByParams } from 'shared/helpers/filter'

export const arrayToOption = (arr: (string | string[])[]): SelectOption[] => {
  return getUnique(arr.flat()).map(item => {
    return { value: item, label: item }
  })
}

export const filtersToOptions = (
  filters: FiltersObject
): SelectOptionsObject => {
  const obj: SelectOptionsObject = {}
  Object.keys(filters).map(key => {
    let currentArr: (string | string[])[] = []
    filters[key].forEach(item => {
      if (item.values) currentArr.push(item.values)
    })
    obj[key] = arrayToOption(currentArr.flat())
  })
  return obj
}

export const filtersToState = (filters: FiltersObject): StateOptionsObject => {
  const obj: StateOptionsObject = {}
  Object.keys(filters).map(key => {
    obj[key] = null
  })
  return obj
}

export const filterList = (
  filters: FiltersObject,
  activeFilter: StateOptionsObject,
  array: CompanyType[]
): CompanyType[] => {
  let filteredArray: CompanyType[] = array

  Object.keys(filters).map(key => {
    filteredArray = filteredArray.filter(item => {
      const currentItem = filters[key].find(elem => elem.id === item.id)
      return filterByParams(currentItem?.values || null, activeFilter[key])
    })
  })
  return filteredArray
}
