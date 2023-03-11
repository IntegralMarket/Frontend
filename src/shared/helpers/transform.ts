export const getQuantity = (
  min: number | null,
  max: number | null,
  full?: boolean
): string => {
  if (min !== null && max !== null) {
    return full ? `min ${min} to max ${max}` : `${min}-${max}`
  }
  if (min !== null) {
    return full ? `min ${min}` : min.toString()
  }
  return '-'
}

// export const
