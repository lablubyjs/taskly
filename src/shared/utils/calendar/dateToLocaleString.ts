export const dateToLocaleString = (value: Date, locales: string, options: object) => {
  return value.toLocaleString(locales, options)
}
