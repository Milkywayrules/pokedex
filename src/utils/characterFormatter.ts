/**
 * Capitalize only the first character of a string.
 *
 * @param str string to be caps the first letter
 * @returns string with capitalized first char
 */
export const capsFirstChar = (str: string): string => {
  if (!str) return str

  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Capitalize the first character on every word separated by separator.
 *
 * @param str string to be caps the first letter on every word
 * @param separator separator between word
 * @default ' '
 * @returns string siwth capitalized first char on every word
 */
export const capsFirstCharEveryWord = (str: string, separator = ' '): string => {
  if (!str) return str

  return str
    .split(separator)
    .map(word => capsFirstChar(word))
    .join(separator)
}
