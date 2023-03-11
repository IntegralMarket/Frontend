import { Meta, SelectOption, SelectType } from 'shared/types'

export const metaToOptions = (value: Meta[] | undefined): SelectOption[] => {
  if (!value) return []
  return value.map(item => {
    return { value: item.id.toString(), label: item.name }
  })
}

export const stringToOption = (value: SelectType<string>): SelectType => {
  if (value === null || value === undefined) return null
  return Array.isArray(value)
    ? value.map(str => {
        return { value: str, label: str }
      })
    : { value: value, label: value }
}

export const metaToOption = (value: Meta[] | Meta | undefined): SelectType => {
  if (value === null || value === undefined) return null
  return Array.isArray(value)
    ? value.map(str => {
        return { value: str.id.toString(), label: str.name }
      })
    : { value: value.id.toString(), label: value.name }
}

export const optionToString = (value: SelectType): SelectType<string> => {
  if (value === null) return null
  return Array.isArray(value) ? value.map(f => f.value) : value.value
}
