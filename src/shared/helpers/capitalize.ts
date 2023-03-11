export const capitalize = (str: string): string =>
  (str && str[0].toUpperCase() + str.slice(1)) || ''
