export const isJSONEqual = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const isShallowEqual = (objA: any, objB: any): boolean => {
  if (Object.is(objA, objB)) return true

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  )
    return false

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !Object.is(objA[keysA[i]], objB[keysA[i]])
    )
      return false
  }

  return true
}

export const isNull = (value: any): boolean => {
  return value === null || value === undefined || value === 0 || value === ''
}

export const isNullShallow = (obj: any): boolean => {
  return Object.values(obj).every(value => {
    return isNull(value)
  })
}

export const isNullDeep = (obj: any): boolean => {
  return Object.values(obj).every(value =>
    Array.isArray(value) ? value.every(v => isNull(v)) : isNull(value)
  )
}

export const isEvenNumber = (num: number): boolean => {
  return num % 2 === 0
}
